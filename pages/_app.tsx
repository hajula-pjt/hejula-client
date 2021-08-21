import "../styles/globals.css";
import type { AppProps } from "next/app";

import { CookiesProvider } from "react-cookie";

import axios from "axios";

import { BACKEND_SERVER_URL } from "../src/constants/server";
import AppLayout from "../src/components/AppLayout";
import { useRouter } from "next/router";

axios.defaults.baseURL = BACKEND_SERVER_URL;

const isHasShadow = (path) => {
  const PATHS = ["/search"];

  return PATHS.includes(path);
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <CookiesProvider>
      <AppLayout isHasShadow={isHasShadow(router.pathname)}>
        <Component {...pageProps} />
      </AppLayout>
    </CookiesProvider>
  );
}
export default MyApp;
