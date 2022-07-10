import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CanvasComponent from '../components/CanvasComponent';
import SplashScreen from '../components/SplashScreen';
import * as R from 'ramda'
import { getIPFSFabricJSON } from '../utils/loadCanvasDataUtils';

const moralisApi = "https://deep-index.moralis.io/api/v2"

const saveToLog = "SaveToLog(address,string)"

const saveToLogAbi = {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "_from",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "string",
      "name": "canvasItem",
      "type": "string"
    }
  ],
  "name": "SaveToLog",
  "type": "event"
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, max-age=360, stale-while-revalidate=60'
  )

  const moralisApiKey = process.env.MORALIS_API_KEY || "";

  const nftContractAddress = process.env.NEXT_PUBLIC_CANVAS_NFT_ADDRESS || "";

  const canvasSaverConractAddress = process.env.NEXT_PUBLIC_CANVAS_SAVER_ADDRESS || ""

  //fetch nft
  const { result: suppliedNfts } = await fetch(`${moralisApi}/nft/${nftContractAddress}?format=decimal&chain=rinkeby`,
    {
      headers: {
        "x-api-key": moralisApiKey
      }
    }).then(response => response.json())

  const mappedSuppliedNFTs = R.map(R.over(R.lensProp('metadata'), JSON.parse), suppliedNfts)

  const nftList = R.reject(R.compose(R.isNil, R.path(['metadata', 'objectData'])), mappedSuppliedNFTs)

  //fetch drawings

  const { result } = await fetch(`${moralisApi}/${canvasSaverConractAddress}/events?chain=rinkeby&topic=${saveToLog}`,
    {
      method: "POST",
      body: JSON.stringify(saveToLogAbi),
      headers: {
        "x-api-key": moralisApiKey,
        "Content-Type": 'application/json',
        'accept': 'application/json'
      }
    }).then(response => response.json())

  const drawingList = await Promise.all(result.map(R.path(['data', 'canvasItem'])).map((hash: string) => getIPFSFabricJSON(hash)))

  return {
    props: { nftList, drawingList }
  }
}
const Home: NextPage<{ nftList: any[], drawingList: any[] }> = ({ nftList, drawingList }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SplashScreen indeterminated promise={new Promise(res => {setTimeout(res, 500)})} />
      <CanvasComponent nftList={nftList} drawingList={drawingList} />
    </div>
  )
}

export default Home