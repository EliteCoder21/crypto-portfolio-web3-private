"use client";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

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

export default function RootLayout({ Component, pageProps }) {
  return (
    <div lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>OpenEXA Portfolio</title>
      </Head>
      <WagmiConfig config={config}>
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
      </WagmiConfig>
    </div>
  );
}
