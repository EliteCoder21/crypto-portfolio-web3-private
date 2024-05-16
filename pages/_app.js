"use client";
import { WagmiProvider, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import "../styles/globals.css";
import "../styles/microtip.css";
import "../styles/navbar.css";
import "../styles/section.css";
import "../styles/view.css";
import { AuthContextProvider } from "../firebase/context";
import Head from "next/head";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: "demo",
    appName: "OpenEXA Portfolio",
    appIcon: "https://openexa.ai/openexa-favicon.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
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
