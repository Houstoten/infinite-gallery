import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Symfoni } from '../hardhat/SymfoniContext'
import { Toaster } from 'react-hot-toast';
import { CanvasContextProvider } from '../state/context';
import SplashScreen from '../components/SplashScreen';


function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  return <Symfoni
    autoInit
    loadingComponent={<SplashScreen indeterminated transition={false} />}
  >
    <Toaster toastOptions={{
      className: '',
      style: {
        // border: '1px solid #713200',
        padding: '10px 20px',
        color: '#000000',
        fontSize: '1.2em',
        fontWeight: 500
      },
      position: 'top-right'
    }} />
    <CanvasContextProvider>
      <Component {...pageProps} />
    </CanvasContextProvider>
  </Symfoni>
}

export default MyApp
