import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

import type { AppProps } from "next/app";
import { NextPage } from "next";

import Head from "next/head";
import Image from "next/image";

import Script from "next/script";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { ContractProvider } from "@/context/ContractProvider";

import { wagmiClient, chains } from "../config/rainbow/setup";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@mui/material";
import { GlobalStyle } from "../styles/layout/global";
import { PumpTheme } from "../styles/layout/theme";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    navbar: true;
    sidebar: true;
    dashboard: true;
    primaryConnect: true;
    enterApp: true;
    wrongNetwork: true;
    choseNetwork: true;
  }
}

declare module "@mui/material/Card" {
  interface CardPropsVariantOverrides {
    landingCard: true;
    DashboardCard: true;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsVariantOverrides {
    AcceptRules: true;
  }
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppProp = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppProp) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  const routingName = () => {
    if (router.pathname === "/") {
      return "Pump Me the next gen gambling";
    }

    const name = router.pathname.slice(1);
    const title = name.charAt(0).toUpperCase() + name.slice(1);
    return "Umatch/Artys - " + title;
  };
  return (
    <>
      <Head>
        <title>{routingName()}</title>
        <meta name="title" content="Umatch - Your decentralised music" />
        <meta
          name="description"
          content="Umatch is a leading platform over decentralised music we promote your music & your user make benefit  "
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pumpMe.io/" />
        <meta
          property="og:title"
          content="Pumpme - Your first multiplayer gamble system "
        />
        <meta
          property="og:description"
          content="A decentralised web3 music platform"
        />
        <meta property="og:image" content="/images/metaBg.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pumpMe.io/" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Crypto,web3,Web3 Multi game, Web3 Gamble"
        />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider
              chains={chains}
              modalSize="compact"
              theme={midnightTheme({
                accentColor: "#005BFF",
                accentColorForeground: "white",
                borderRadius: "large",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
              <ContractProvider>
                <ThemeProvider theme={PumpTheme}>
                  <GlobalStyle />
                  {getLayout(
                    <>
                      <ToastContainer />
                      <Component {...pageProps} />
                    </>
                  )}
                </ThemeProvider>
              </ContractProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
          {/* </ContractProvider> */}
        </SessionProvider>
      </WagmiConfig>
    </>
  );
}
