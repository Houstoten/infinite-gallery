import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from 'usehooks-ts'
import ToolboxComponent from "./TollboxComponent";
import * as R from 'ramda'
import { PinataPinResponse } from "@pinata/sdk";
import Pako from "pako";
import { CanvasSaverContext, CanvasNFTContext } from "../hardhat/SymfoniContext";
import hash from 'hash-it';
import toast from 'react-hot-toast';
import { useCanvas } from "../state/context";
import { deleteSelectedObject, publishCanvasChanges, publishNFTItem, setCanvas, setNonEditable } from "../state/reducer";
import { fabric } from "fabric";
import { ethers } from "ethers";

const warningToast = (text: string) => toast(text, { icon: "⚠️" })

const CanvasComponent: FC = () => {

    const canvasSaver = useContext(CanvasSaverContext)

    const canvasNFT = useContext(CanvasNFTContext)

    const { state, dispatch } = useCanvas()

    const { canvasObject, nonEditable } = state

    const [drawingMode, setDrawingMode] = useState<boolean>(false);

    const memoRefCallback = useCallback(R.compose(dispatch, setCanvas), [])

    const { height, width } = useWindowSize()

    useEffect(() => {

        const onDelHandler = R.when(R.propEq('key', 'Delete'), () => dispatch(deleteSelectedObject()))

        document.addEventListener('keydown', onDelHandler)

        return () => document.removeEventListener('keydown', onDelHandler)

    }, [])

    useEffect(() => {
        if (canvasObject) {
            setNonEditable(canvasSaver, dispatch).then(dispatch)
        }
    }, [canvasObject, canvasSaver.instance]);

    useEffect(() => {
        canvasObject?.setDimensions?.({ width, height })
    }, [width, height, canvasObject])

    useEffect(() => {
        canvasObject && (canvasObject.isDrawingMode = drawingMode)
    }, [drawingMode])

    const onPublishClick = () => {
        publishCanvasChanges(canvasSaver, nonEditable, canvasObject).then(dispatch)
    }

    const onGroupClick = () => {
        publishNFTItem(canvasNFT, nonEditable, canvasObject).then(dispatch)
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
            onPublishNFT={onGroupClick}
        />
    </>
}

export default CanvasComponent