import { fabric } from "fabric";
import { Canvas } from 'fabric/fabric-impl';
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { useWindowSize } from 'usehooks-ts'
import ToolboxComponent from "./TollboxComponent";
import * as R from 'ramda'
import { PinataPinResponse } from "@pinata/sdk";
import Pako from "pako";
import { CanvasSaverContext } from "../hardhat/SymfoniContext";
import hash from 'hash-it';
import toast from 'react-hot-toast';

const warningToast = (text: string) => toast(text, { icon: "⚠️" })

const CanvasComponent: FC = () => {

    const canvasSaver = useContext(CanvasSaverContext)

    const canvas = useRef<Canvas>()

    const [nonEditable, loadNonEditable] = useState<string[]>([])

    const [drawingMode, setDrawingMode] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const { height, width } = useWindowSize()

    useEffect(() => {
        if (!canvas.current) {
            canvas.current = new fabric.Canvas(canvasRef.current ?? 'canvas', {
                backgroundColor: 'rgba(0,0,0,0)',
                isDrawingMode: false,
            });
            canvas.current.on('mouse:wheel', function (opt) {
                const delta = opt.e.deltaY;
                const zoom = canvas.current?.getZoom() ?? 0;

                const calculatedZoom = R.cond([
                    [R.gte(0.8), R.always(0.8)],
                    [R.lte(5), R.always(5)],
                    [R.T, R.identity],
                ])(zoom * 0.999 ** delta)

                canvas.current?.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, calculatedZoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });
        }
    }, []);

    useEffect(() => {
        canvas.current?.setDimensions?.({ width, height })
    }, [width, height])

    useEffect(() => {
        canvas.current && (canvas.current.isDrawingMode = drawingMode)
    }, [drawingMode])

    useEffect(() => {
        loadNonEditable([])

        onGetEventLog().then(objectList => {
            objectList.forEach(singleObject => loadNonEditable(R.concat(singleObject.objects.map(hash))))
            const _fabricObject = objectList.reduce((acc, currentObject) => ({ ...acc, ...currentObject, objects: R.concat(acc.objects ?? [], currentObject.objects) }), {})

            canvas.current?.loadFromJSON(_fabricObject, () => canvas.current?.renderAll(), function (o: any, object: any) {
                object.set('selectable', false);
            })

        })

    }, [canvasSaver.instance])

    const onPublishClick = async () => {
        //@ts-ignore
        const jsonObject: any = R.over(R.lensProp('objects'), R.reject(object => R.find(R.equals(hash(object)), nonEditable)), canvas.current?.toJSON())
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
        canvas.current?.getObjects().forEach(object => {
            //@ts-ignore
            if (!R.find(R.equals(hash(object.toJSON())), nonEditable)) {
                canvas.current?.remove(object)
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
        <canvas id="canvas" ref={canvasRef} />

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