import { IPostLoginResultValue } from "../../../api/user/postLogin";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../utils/localStorage";
import { IUserInfo, TCookieKey, TStotageKey } from "../type";

const setUserInfo = async ({
  userInfo,
  cookieKey,
  storageKey,
  setCookie,
  setUser,
}: {
  userInfo: IPostLoginResultValue;
  cookieKey: TCookieKey;
  storageKey: TStotageKey;
  setCookie: ({ key, value }: { key: TCookieKey; value: string }) => void;
  setUser: (userInfo: IUserInfo) => void;
}) => {
  const accessToken = userInfo.token;

  const { nickname, userId, userSeq } = userInfo;

  setCookie({ key: cookieKey, value: accessToken });

  setLocalStorageItem({
    key: storageKey,
    value: JSON.stringify({ nickname, userId, userSeq }),
  });

  setUser(getLocalStorageItem({ key: storageKey }));
};

export default setUserInfo;
