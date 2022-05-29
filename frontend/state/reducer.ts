import { fabric } from "fabric";
import { ActionType, CanvasActions, DeleteSelectedObject, IncrementSplashLoading, InitSplashLoading, SetBrushColor, SetBrushThickness, SetCanvasElement, SetNonEditable, SetPublishCanvasResult, SetPublishNFTResult } from "./actions";
import { CanvasState } from "./state";
import * as R from 'ramda'
import { SymfoniCanvasNFT, SymfoniCanvasSaver } from "../hardhat/SymfoniContext";
import { onGetEventLog } from "../utils/loadCanvasDataUtils";
import hash from 'hash-it';
import { warningToast } from "../utils/toastUtils";
import toast from "react-hot-toast";
import { PinataPinResponse } from "@pinata/sdk";
import { Canvas } from "fabric/fabric-impl";
import { ethers } from "ethers";

const canvasSaverAddress = process.env.NEXT_PUBLIC_CANVAS_SAVER_ADDRESS || ""
const canvasNFTAddress = process.env.NEXT_PUBLIC_CANVAS_NFT_ADDRESS || ""
const pinataGatewayPrefix = process.env.NEXT_PUBLIC_PINATA_PREFIX || ""

export const canvasReducer = (state: CanvasState, action: CanvasActions): CanvasState => {
    switch (action.type) {
        case ActionType.SetCanvasElement: {

            const canvasObject = new fabric.Canvas(action.payload ?? 'canvas', {
                backgroundColor: 'rgba(0,0,0,0)',
                isDrawingMode: false,
            })

            canvasObject.freeDrawingBrush.color = state.brush.color
            canvasObject.freeDrawingBrush.width = state.brush.thickness

            canvasObject.on('mouse:wheel', function (opt) {
                const delta = opt.e.deltaY;
                const zoom = canvasObject.getZoom() ?? 0;

                const calculatedZoom = R.cond([
                    [R.gte(0.8), R.always(0.8)],
                    [R.lte(5), R.always(5)],
                    [R.T, R.identity],
                ])(zoom * 0.999 ** delta)

                canvasObject.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, calculatedZoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });

            const _state = {
                ...state,
                canvasElement: action.payload,
                canvasObject
            }

            return _state
        }
        case ActionType.SetNonEditable: {

            const objectList = action.payload

            const nonEditable: string[] = objectList.reduce((acc, singleObject) => [...acc, ...singleObject.objects.map(hash)], [])

            const _fabricObject = objectList.reduce((acc, currentObject) => ({ ...acc, ...currentObject, objects: R.concat(acc.objects ?? [], currentObject.objects) }), {})

            state.canvasObject?.loadFromJSON(_fabricObject, () => state.canvasObject?.renderAll(), function (o: any, object: any) {
                object.set('selectable', false);
            })

            return {
                ...state,
                nonEditable: nonEditable
            }
        }
        case ActionType.SetBrushColor: {
            state.canvasObject && (state.canvasObject.freeDrawingBrush.color = action.payload)
            return {
                ...state,
                brush: {
                    ...state.brush,
                    color: action.payload
                }
            }
        }
        case ActionType.SetBrushThickness:
            return {
                ...state,
                brush: {
                    ...state.brush,
                    thickness: action.payload
                }
            }
        case ActionType.InitSplashLoading: {
            return {
                ...state,
                splashLoading: {
                    initial: action.payload,
                    progress: 0,
                    loading: !!action.payload
                }
            }
        }
        case ActionType.IncrementSplashLoading:
            const progress = R.add(state.splashLoading.progress, action.payload)

            if (progress >= state.splashLoading.initial) {
                return {
                    ...state,
                    splashLoading: {
                        initial: 0,
                        progress: 0,
                        loading: false
                    }
                }
            }

            return {
                ...state,
                splashLoading: {
                    initial: state.splashLoading.initial,
                    progress,
                    loading: true
                }
            }
        case ActionType.DeleteSelectedObject: {
            if (state.canvasObject) {
                state.canvasObject.getActiveObjects().forEach(obj => state.canvasObject && state.canvasObject.remove(obj))
            }
            return state
        }
        default:
            return state

    }
}

export const setCanvas = (canvasElement: HTMLCanvasElement): SetCanvasElement => ({
    type: ActionType.SetCanvasElement,
    payload: canvasElement
})

export const setNonEditable = async (canvasSaver: SymfoniCanvasSaver, dispatch: React.Dispatch<CanvasActions>): Promise<SetNonEditable> => {

    const objectList = await onGetEventLog(canvasSaver, dispatch)

    return {
        type: ActionType.SetNonEditable,
        payload: objectList
    }
}

export const initSplashLoading = (number: number): InitSplashLoading => ({
    type: ActionType.InitSplashLoading,
    payload: number
})

export const incrementSplashLoading = (number: number): IncrementSplashLoading => ({
    type: ActionType.IncrementSplashLoading,
    payload: number
})

export const publishCanvasChanges = async (canvasSaver: SymfoniCanvasSaver, nonEditable: string[], canvasObject?: Canvas): Promise<SetPublishCanvasResult> => {

    if (!canvasObject) {
        warningToast('Canvas is not detected')
    }
    //@ts-ignore
    const jsonObject: any = R.over(R.lensProp('objects'), R.reject(object => R.find(R.equals(hash(object)), nonEditable)), canvasObject.toJSON())
    if (jsonObject.objects.length === 0) {
        warningToast('Nothing to publish')
        return {
            type: ActionType.SetPublishCanvasResult,
            payload: true
        }
    }

    const toastId = toast.loading('Initializing transaction...');

    const { IpfsHash } = await fetch("/api/publish", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
    }).then(data => data.json() as Promise<PinataPinResponse>)

    await canvasSaver.factory?.attach(canvasSaverAddress).saveCanvasItem(IpfsHash).then(() => {
        toast.success('Transaction succeed', {
            id: toastId,
        });
    })

    return {
        type: ActionType.SetPublishCanvasResult,
        payload: true
    }
}

export const publishNFTItem = async (canvasNFT: SymfoniCanvasNFT, nonEditable: string[], canvasObject?: Canvas): Promise<SetPublishNFTResult> => {

    if (!canvasObject) {
        warningToast('Canvas is not detected')
    }

    //@ts-ignore
    const canvasObjectItems: any = R.reject((obj: fabric.Object) => R.find(R.equals(hash(obj.toJSON())), nonEditable), canvasObject?.getObjects())

    const group = new fabric.Group(canvasObjectItems, { originX: 'center', originY: 'center' })

    const groupURI = group.toDataURL({})

    const pinResponse = await fetch("/api/pinNFT", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imgURI: groupURI,
            groupJson: group.toJSON()
        })
    }).then(data => data.json() as Promise<PinataPinResponse>)

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signerAddress = await provider.getSigner().getAddress();

    await canvasNFT.factory?.attach(canvasNFTAddress).mintNFT(signerAddress, pinataGatewayPrefix + pinResponse.IpfsHash)

    return {
        type: ActionType.SetPublishNFTResult,
        payload: true
    }

}

export const setBrushColor = (color: string): SetBrushColor => ({
    type: ActionType.SetBrushColor,
    payload: color
})

export const setBrushThickness = (thickness: number): SetBrushThickness => ({
    type: ActionType.SetBrushThickness,
    payload: thickness
})

export const deleteSelectedObject = (): DeleteSelectedObject => ({
    type: ActionType.DeleteSelectedObject,
    payload: null
})
