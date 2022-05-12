import Pako from "pako"
import * as R from "ramda"
import React from "react"
import { SymfoniCanvasSaver } from "../hardhat/SymfoniContext"
import { CanvasActions } from "../state/actions"
import { incrementSplashLoading, initSplashLoading } from "../state/reducer"

export const getIPFSFabricJSON = async (ipfsHash: string) => {
    const responseArrayBuffer = await fetch("https://ipfs.io/ipfs/" + ipfsHash).then(data => data.blob()).then(blob => blob.arrayBuffer())
    const responseUInt8Array = new Uint8Array(responseArrayBuffer)

    await new Promise(res => {
        setTimeout(res, Math.random() * 3000);
    })

    return JSON.parse(Pako.inflate(responseUInt8Array, { to: 'string' }))
}

export const onGetEventLog = async (canvasSaver: SymfoniCanvasSaver, dispatch: React.Dispatch<CanvasActions>) => {
    if (canvasSaver.instance) {
        const eventData: any = await canvasSaver.instance.queryFilter(canvasSaver.instance.filters.SaveToLog(null, null))

        await dispatch(initSplashLoading(eventData.length))

        return await Promise.all(eventData.map(R.path(['args', 'canvasItem'])).map((hash: string) => getIPFSFabricJSON(hash).then(R.tap(() => dispatch(incrementSplashLoading(1))))))
    }
    return []
}