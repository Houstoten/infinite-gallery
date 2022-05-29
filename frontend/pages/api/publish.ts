
import type { NextApiRequest, NextApiResponse } from 'next'
import pinataClient from '@pinata/sdk';
import { unescape } from 'querystring';
import Pako from 'pako';
import { Duplex } from 'stream';

const pinata = pinataClient(process.env.PINATA_API_KEY || "", process.env.PINATA_API_KEY_SECRET || "")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;

    const utf8Data = unescape(encodeURIComponent(JSON.stringify(data)))
    const dataGz = Pako.gzip(utf8Data)
    const stream = new Duplex()
    //@ts-ignore
    stream.path = "somefile.json.gz"
    stream.push(dataGz)
    stream.push(null)

    const pinResponse = await pinata.pinFileToIPFS(stream, { pinataMetadata: { name: 'userDrawing' } })

    res.status(200).json(pinResponse);
}