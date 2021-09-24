import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { TCookieKey } from "../type";

export interface IuseLoginCookieReturnValue {
  cookies: {
    Authorization?: string;
    AdminAuthorization?: string;
  };
  removeCookie: (cookieKey: TCookieKey) => void;
  handleSetCookie: ({ key, value }: { key: string; value: string }) => void;
}

const useLoginCookie = ({
  cookieKey,
}: {
  cookieKey: TCookieKey;
}): IuseLoginCookieReturnValue => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieKey]);

  useEffect(() => {
    if (cookies) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies[cookieKey]}`;
    }
  }, [cookies, cookieKey]);

  const handleSetCookie = ({ key, value }) => setCookie(key, value);

  return {
    cookies,
    removeCookie,
    handleSetCookie,
  };
};

export default useLoginCookie;
