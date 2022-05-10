import { fabric } from "fabric";
import { Canvas } from 'fabric/fabric-impl';
import { FC, useEffect, useRef, useState } from "react";
import { useWindowSize } from 'usehooks-ts'
import ToolboxComponent from "./TollboxComponent";
import * as R from 'ramda'
import { PinataPinResponse } from "@pinata/sdk";
import Pako from "pako";

const ipfsHash = "QmW5wTLcErLbSwndcsJozuBsL44LJWSWQvAq2637YLD7d8"

const CanvasComponent: FC = () => {

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
        console.log(IpfsHash)
    }

    const onClearCanvas = () => {
        canvas.current?.clear()
    }

    const onLoadGeneralCanvas = async () => {
        const responseArrayBuffer = await fetch("https://ipfs.io/ipfs/" + ipfsHash).then(data => data.blob()).then(blob => blob.arrayBuffer())
        const responseUInt8Array = new Uint8Array(responseArrayBuffer)

        const responseJson = JSON.parse(Pako.inflate(responseUInt8Array, { to: 'string' }))
        canvas.current?.loadFromJSON(responseJson, () => canvas.current?.renderAll(), function (o: any, object: any) {
            object.set('selectable', false);
        })
    }

    return <>
        <canvas id="canvas" ref={canvasRef} />
        <ToolboxComponent
            css={{ position: "fixed", bottom: "10px", right: 0, width: 'auto' }}
            editable={drawingMode}
            setEditable={setDrawingMode}
            onPublishClick={onPublishClick}
            onClearCanvas={onClearCanvas}
            onLoadGeneralCanvas={onLoadGeneralCanvas}
        />
        {/* <button onClick={() => console.log(canvas.current?.toJSON(["selectable", "objects"]))}>TO JSON</button>
        <button onClick={() => setDrawingMode(mode => !mode)}>Drawing mode is {drawingMode ? "active" : "disabled"}</button> */}
    </>
}

export default CanvasComponent