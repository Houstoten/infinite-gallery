import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from 'usehooks-ts'
import ToolboxComponent from "./TollboxComponent";
import * as R from 'ramda'
import { PinataPinResponse } from "@pinata/sdk";
import Pako from "pako";
import { CanvasSaverContext } from "../hardhat/SymfoniContext";
import hash from 'hash-it';
import toast from 'react-hot-toast';
import { useCanvas } from "../state/context";
import { setCanvas } from "../state/reducer";

const warningToast = (text: string) => toast(text, { icon: "⚠️" })

const CanvasComponent: FC = () => {

    const canvasSaver = useContext(CanvasSaverContext)

    const { state, dispatch } = useCanvas()

    // const canvas = useRef<Canvas>()
    const { canvasObject } = state

    const [nonEditable, loadNonEditable] = useState<string[]>([])

    const [drawingMode, setDrawingMode] = useState<boolean>(false);

    const memoRefCallback = useCallback(R.compose(dispatch, setCanvas), [])

    const { height, width } = useWindowSize()

    // useEffect(() => {
    //     if (!state.canvasObject) {
    //         dispatch(setCanvas(canvasjjjRef))
    //     }
    // }, []);

    useEffect(() => {
        canvasObject?.setDimensions?.({ width, height })
    }, [width, height, canvasObject])

    useEffect(() => {
        canvasObject && (canvasObject.isDrawingMode = drawingMode)
    }, [drawingMode])

    useEffect(() => {
        if (canvasObject) {
            loadNonEditable([])

            onGetEventLog().then(objectList => {
                objectList.forEach(singleObject => loadNonEditable(R.concat(singleObject.objects.map(hash))))
                const _fabricObject = objectList.reduce((acc, currentObject) => ({ ...acc, ...currentObject, objects: R.concat(acc.objects ?? [], currentObject.objects) }), {})

                canvasObject?.loadFromJSON(_fabricObject, () => canvasObject?.renderAll(), function (o: any, object: any) {
                    object.set('selectable', false);
                })

            })
        }
    }, [canvasSaver.instance, canvasObject])

    const onPublishClick = async () => {
        //@ts-ignore
        const jsonObject: any = R.over(R.lensProp('objects'), R.reject(object => R.find(R.equals(hash(object)), nonEditable)), canvasObject.toJSON())
        if (jsonObject.objects.length === 0) {
            warningToast('Nothing to publish')
            return
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


        canvasSaver.instance?.saveCanvasItem(IpfsHash).then(() => {
            toast.success('Transaction succeed', {
                id: toastId,
            });
        })
    }

    const onClearCanvas = () => {
        canvasObject?.getObjects().forEach(object => {
            //@ts-ignore
            if (!R.find(R.equals(hash(object.toJSON())), nonEditable)) {
                canvasObject?.remove(object)
            }
        })
    }

    const getIPFSFabricJSON = async (ipfsHash: string) => {
        const responseArrayBuffer = await fetch("https://ipfs.io/ipfs/" + ipfsHash).then(data => data.blob()).then(blob => blob.arrayBuffer())
        const responseUInt8Array = new Uint8Array(responseArrayBuffer)

        return JSON.parse(Pako.inflate(responseUInt8Array, { to: 'string' }))
    }

    const onGetEventLog = async () => {
        if (canvasSaver.instance) {
            const eventData: any = await canvasSaver.instance.queryFilter(canvasSaver.instance.filters.SaveToLog(null, null))

            return await Promise.all(eventData.map(R.path(['args', 'canvasItem'])).map(getIPFSFabricJSON))
        }
        return []
    }

    return <>
        <canvas id="canvas" ref={memoRefCallback} />

        <ToolboxComponent
            css={{ position: "fixed", bottom: "10px", right: 0, width: 'auto' }}
            editable={drawingMode}
            setEditable={setDrawingMode}
            onPublishClick={onPublishClick}
            onClearCanvas={onClearCanvas}
            onLoadGeneralCanvas={onGetEventLog}
        />
    </>
}

export default CanvasComponent