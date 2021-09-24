import { removeLocalStorageItem } from "../../../utils/localStorage";
import { TCookieKey, TStotageKey } from "../type";

interface IremoveUserInfo {
  cookieKey: TCookieKey;
  storageKey: TStotageKey;
  removeCookie: (cookieKey: TCookieKey) => void;
  setUser: (userInfo: null) => void;
}

const removeUserInfo = ({
  cookieKey,
  storageKey,
  removeCookie,
  setUser,
}: IremoveUserInfo) => {
  removeCookie(cookieKey);

  removeLocalStorageItem({ key: storageKey });

  setUser(null);
};

export default removeUserInfo;
