import type { NextApiRequest, NextApiResponse } from 'next'
import pinataClient from '@pinata/sdk';
//@ts-ignore
import toUint8Array from 'base64-to-uint8array'
import { Duplex } from 'stream';

const pinata = pinataClient(process.env.PINATA_API_KEY || "", process.env.PINATA_API_KEY_SECRET || "")

const pinataGatewayPrefix = process.env.NEXT_PUBLIC_PINATA_PREFIX

const metadata = {
  "description": "Welcome to InfiniteGallery NFT World!",
  "name": "BEST NFT IN COLLECTION"
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: {imgURI: string, groupJson: object} = req.body

    const {imgURI, groupJson} = data;

    const base64Img = imgURI.replace(/^data:image\/(png|jpg);base64,/, "")

    const uint8ArrayImg = toUint8Array(base64Img)

    const stream = new Duplex()
    
    //@ts-ignore
    stream.path = "MyNFT.png"
    stream.push(uint8ArrayImg)
    stream.push(null)

    const pinResponse = await pinata.pinFileToIPFS(stream, { pinataMetadata: { name: 'userNFT' } })

    const nftPinResponse = await pinata.pinJSONToIPFS({...metadata, objectData: groupJson, image: pinataGatewayPrefix + pinResponse.IpfsHash}, { pinataMetadata: { name: 'UserNFTBody' } })
    
    res.status(200).json(nftPinResponse);
}