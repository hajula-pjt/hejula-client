import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { CookiesProvider } from "react-cookie";
import { Global } from "@emotion/react";
import axios from "axios";

import globalStyle from "../src/styles/GlobalCss";
import { BACKEND_SERVER_URL } from "../src/constants/server";
import AppLayout from "../src/components/AppLayout";
import { isMainPage, isUnVisibleSearchForm } from "../src/utils/path";

axios.defaults.baseURL = BACKEND_SERVER_URL;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <CookiesProvider>
      <Global styles={globalStyle} />
      <AppLayout
        isMainPage={isMainPage(pathname)}
        isUnVisibleSearchForm={isUnVisibleSearchForm(pathname)}
      >
        <Component {...pageProps} />
      </AppLayout>
    </CookiesProvider>
  );
}
export default MyApp;
