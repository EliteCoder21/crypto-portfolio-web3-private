"use client";

import "../styles/globals.css";
import "../styles/microtip.css";
import "../styles/navbar.css";
import "../styles/section.css";
import "../styles/view.css";

import Head from "next/head";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from "../firebase/context";
import { WagmiProvider } from "wagmi";
import { createConfig, http, fallback } from '@wagmi/core'
import { mainnet } from 'wagmi/chains';

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet],
    walletConnectProjectId: process.env.WALLET_CONNECT_KEY,
    appName: "OpenEXA Portfolio",
    appIcon: "https://openexa.ai/openexa-favicon.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)

    transports: {
      [mainnet.id]: fallback([
        //http(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`),
        http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`),
        http() // public fallback
      ]),
    }
  })
);

const queryClient = new QueryClient();

export default function RootLayout({ Component, pageProps }) {
  return (
    <div lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>OpenEXA Portfolio</title>
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider mode="light">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "105vh",
              }}
            >
              <AuthContextProvider>
                <Component {...pageProps} />
              </AuthContextProvider>
            </div>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
