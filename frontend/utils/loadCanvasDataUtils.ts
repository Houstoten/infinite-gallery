import Pako from "pako"
import * as R from "ramda"
import { SymfoniCanvasSaver } from "../hardhat/SymfoniContext"

export const getIPFSFabricJSON = async (ipfsHash: string) => {
    const responseArrayBuffer = await fetch("https://ipfs.io/ipfs/" + ipfsHash).then(data => data.blob()).then(blob => blob.arrayBuffer())
    const responseUInt8Array = new Uint8Array(responseArrayBuffer)

    return JSON.parse(Pako.inflate(responseUInt8Array, { to: 'string' }))
}

export const onGetEventLog = async (canvasSaver: SymfoniCanvasSaver) => {
    if (canvasSaver.instance) {
        const eventData: any = await canvasSaver.instance.queryFilter(canvasSaver.instance.filters.SaveToLog(null, null))

        return await Promise.all(eventData.map(R.path(['args', 'canvasItem'])).map(getIPFSFabricJSON))
    }
    return []
}