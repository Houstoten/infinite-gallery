import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Symfoni } from '../hardhat/SymfoniContext'

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  return <Symfoni autoInit>
    <Component {...pageProps} />
  </Symfoni>
}

export default MyApp
