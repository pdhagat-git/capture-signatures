import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ErrorPage from 'next/error'

import { WagmiConfig, createClient } from 'wagmi';
import { mainnet} from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { useRouter } from 'next/router';
import {ethers} from 'ethers'

const client = createClient(
  getDefaultClient({
    appName: 'Signature app',
    chains: [mainnet],
    connectors: [ new MetaMaskConnector({ chains: [mainnet] })]
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { walletAddress, email} = router.query


  if(!(walletAddress&&email)) {
    return <ErrorPage statusCode={404} />
  }

  try{
    const isAddress = ethers.utils.isAddress(walletAddress as string)
    if(!isAddress) return <ErrorPage statusCode={404}/>
  } catch {
    return <ErrorPage statusCode={404} />
  }

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;