import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { CookiesProvider } from "react-cookie";
import { Global } from "@emotion/react";
import axios from "axios";

import globalStyle from "../src/styles/GlobalStyle";
import { BACKEND_SERVER_URL } from "../src/constants/server";
import AppLayout from "../src/components/AppLayout";

axios.defaults.baseURL = BACKEND_SERVER_URL;

const isMainPage = (path) => path === "/";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <CookiesProvider>
      <Global styles={globalStyle} />
      <AppLayout isMainPage={isMainPage(router.pathname)}>
        <Component {...pageProps} />
      </AppLayout>
    </CookiesProvider>
  );
}
export default MyApp;
