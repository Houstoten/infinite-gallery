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
import { setCanvas, setNonEditable } from "../state/reducer";

const warningToast = (text: string) => toast(text, { icon: "⚠️" })

const CanvasComponent: FC = () => {

    const canvasSaver = useContext(CanvasSaverContext)

    const { state, dispatch } = useCanvas()

    const { canvasObject, nonEditable } = state

    const [drawingMode, setDrawingMode] = useState<boolean>(false);

    const memoRefCallback = useCallback(R.compose(dispatch, setCanvas), [])

    const { height, width } = useWindowSize()

    useEffect(() => {
        if(canvasObject){
            setNonEditable(canvasSaver).then(dispatch)
        }
    }, [canvasObject, canvasSaver.instance]);

    useEffect(() => {
        canvasObject?.setDimensions?.({ width, height })
    }, [width, height, canvasObject])

    useEffect(() => {
        canvasObject && (canvasObject.isDrawingMode = drawingMode)
    }, [drawingMode])

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

    return <>
        <canvas id="canvas" ref={memoRefCallback} />

        <ToolboxComponent
            css={{ position: "fixed", bottom: "10px", right: 0, width: 'auto' }}
            editable={drawingMode}
            setEditable={setDrawingMode}
            onPublishClick={onPublishClick}
            onClearCanvas={onClearCanvas}
        />
    </>
}

export default CanvasComponent