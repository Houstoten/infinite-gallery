import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from 'usehooks-ts'
import ToolboxComponent from "./TollboxComponent";
import * as R from 'ramda'
import { CanvasSaverContext, CanvasNFTContext } from "../hardhat/SymfoniContext";
import toast from 'react-hot-toast';
import { useCanvas } from "../state/context";
import { deleteSelectedObject, publishCanvasChanges, publishNFTItem, setCanvas, setNFTs, setNonEditable } from "../state/reducer";
import Script from 'next/script'

const warningToast = (text: string) => toast(text, { icon: "⚠️" })

const CanvasComponent: FC<{ nftList: any[], drawingList: any[] }> = ({ nftList, drawingList }) => {

    const canvasSaver = useContext(CanvasSaverContext)

    const canvasNFT = useContext(CanvasNFTContext)

    const tooltipAnchorRef = useRef<HTMLDivElement>(null);

    const [tooltipTokenId, setTooltipTokenId] = useState<number | null>(null)

    const { state, dispatch } = useCanvas()

    const { canvasObject, nfts } = state

    const [drawingMode, setDrawingMode] = useState<boolean>(false);

    const memoRefCallback = useCallback(R.compose(dispatch, setCanvas), [])

    const { height, width } = useWindowSize()

    useEffect(() => {

        const onDelHandler = R.when(R.propEq('key', 'Delete'), () => dispatch(deleteSelectedObject()))

        document.addEventListener('keydown', onDelHandler)

        return () => document.removeEventListener('keydown', onDelHandler)

    }, [])

    useEffect(() => {
        if (nfts.length) {
            canvasObject?.on('mouse:move', e => {
                //@ts-ignore
                if (e.target?.tokenId && tooltipAnchorRef.current) {
                    //@ts-ignore
                    setTooltipTokenId(e.target.tokenId)
                    tooltipAnchorRef.current.style.top = `${e.e.clientY + 10}px`
                    tooltipAnchorRef.current.style.left = `${e.e.clientX + 10}px`
                    return;
                }

                //@ts-ignore
                if (!e.target?.tokenId) {
                    setTooltipTokenId(null)
                }
            })
            return canvasObject?.removeListeners
        }
    }, [nfts, tooltipAnchorRef.current])

    useEffect(() => {
        if (canvasObject && nftList) {
            dispatch(setNFTs(nftList))
        }
    }, [canvasObject, nftList])

    useEffect(() => {
        // if (canvasObject) {
        dispatch(setNonEditable(drawingList))
        // }
    }, [drawingList]);

    useEffect(() => {
        canvasObject?.setDimensions?.({ width, height })
    }, [width, height, canvasObject])

    useEffect(() => {
        canvasObject && (canvasObject.isDrawingMode = drawingMode)
    }, [drawingMode])

    const onPublishClick = () => {
        publishCanvasChanges(canvasSaver, canvasObject).then(dispatch)
    }

    const onGroupClick = () => {
        publishNFTItem(canvasNFT, canvasObject).then(dispatch)
    }

    const onClearCanvas = () => {
        canvasObject?.getObjects().forEach(object => {
            //@ts-ignore
            if (!object.inBlockchain) {
                canvasObject?.remove(object)
            }
        })
    }

    const tooltip = useCallback(
        // @ts-ignore
        <nft-card
            contractAddress="0x64f9eed0b73c814a24a5e39d6244fad55a73f7ec"
            tokenId={tooltipTokenId} network="rinkeby">
            {/* @ts-ignore */}
        </nft-card>,
        [tooltipTokenId]
    )

    return <>
        <canvas id="canvas" ref={memoRefCallback} />
        {/* @ts-ignore */}
        <div ref={tooltipAnchorRef} style={{ position: 'absolute' }} >
            {tooltipTokenId && tooltip}
            <Script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></Script>
        </div>

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