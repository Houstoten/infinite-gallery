import { fabric } from "fabric";
import { Canvas } from 'fabric/fabric-impl';
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useWindowSize } from 'usehooks-ts'
import ToolboxComponent from "./TollboxComponent";
import * as R from 'ramda'
import { PinataPinResponse } from "@pinata/sdk";
import Pako from "pako";
import { CanvasSaverContext } from "../hardhat/SymfoniContext";

const CanvasComponent: FC = () => {

    const canvasSaver = useContext(CanvasSaverContext)

    const canvas = useRef<Canvas>()

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

    const onPublishClick = async () => {
        const { IpfsHash } = await fetch("/api/publish", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(canvas.current?.toJSON())
        }).then(data => data.json() as Promise<PinataPinResponse>)

        canvasSaver.instance?.saveCanvasItem(IpfsHash)
    }

    const onClearCanvas = () => {
        canvas.current?.clear()
    }

    const getIPFSFabricJSON = async (ipfsHash: string) => {
        const responseArrayBuffer = await fetch("https://ipfs.io/ipfs/" + ipfsHash).then(data => data.blob()).then(blob => blob.arrayBuffer())
        const responseUInt8Array = new Uint8Array(responseArrayBuffer)

        return JSON.parse(Pako.inflate(responseUInt8Array, { to: 'string' }))
    }

    const onGetEventLog = async () => {
        if (canvasSaver.instance) {
            const eventData: any = await canvasSaver.instance.queryFilter(canvasSaver.instance.filters.SaveToLog(null, null))

            const objectList = await Promise.all(eventData.map(R.path(['args', 'canvasItem'])).map(getIPFSFabricJSON))

            const _fabricObject = objectList.reduce((acc, currentObject) => ({ ...acc, ...currentObject, objects: R.concat(acc.objects ?? [], currentObject.objects) }), {})

            canvas.current?.loadFromJSON(_fabricObject, () => canvas.current?.renderAll(), function (o: any, object: any) {
                object.set('selectable', false);
            })

        }
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
        {/* <button onClick={() => console.log(canvas.current?.toJSON(["selectable", "objects"]))}>TO JSON</button>
        <button onClick={() => setDrawingMode(mode => !mode)}>Drawing mode is {drawingMode ? "active" : "disabled"}</button> */}
    </>
}

export default CanvasComponent