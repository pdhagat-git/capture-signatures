import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { WagmiConfig, createClient } from 'wagmi';
import { mainnet} from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

const client = createClient(
  getDefaultClient({
    appName: 'Signature app',
    chains: [mainnet],
    connectors: [ new MetaMaskConnector({ chains: [mainnet] })]
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;