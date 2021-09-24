import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { CookiesProvider } from "react-cookie";
import { Global } from "@emotion/react";
import axios from "axios";

import { BACKEND_SERVER_URL } from "../src/constants/server";
import globalStyle from "../src/styles/GlobalCss";
import AppLayout from "../src/components/AppLayout";
import AdminLayout from "../src/components/AdminLayout";
import {
  isAdminPage,
  isMainPage,
  isUnVisibleSearchForm,
  isVisibleNav,
} from "../src/utils/path";

axios.defaults.baseURL = BACKEND_SERVER_URL;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <CookiesProvider>
      <Global styles={globalStyle} />
      {isAdminPage({ pathname }) ? (
        <AdminLayout isVisibleNav={isVisibleNav(pathname)}>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <AppLayout
          isMainPage={isMainPage(pathname)}
          isUnVisibleSearchForm={isUnVisibleSearchForm(pathname)}
        >
          <Component {...pageProps} />
        </AppLayout>
      )}
    </CookiesProvider>
  );
}
export default MyApp;
