import axios from "axios";
import { useEffect, useState } from "react";

import { getLocalStorageItem } from "../../../utils/localStorage";

import { IUserInfo, TStotageKey } from "../type";

interface IUseLoginUserInfoReturnValue {
  user: IUserInfo;
  handleSetUser: (userInfo: IUserInfo) => void;
}

const useLoginUserInfo = ({
  storageKey,
}: {
  storageKey: TStotageKey;
}): IUseLoginUserInfoReturnValue => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleSetUser(getLocalStorageItem({ key: storageKey }));
  }, [storageKey]);

  const handleSetUser = (userInfo) => setUser(userInfo);

  return {
    user,
    handleSetUser,
  };
};

export default useLoginUserInfo;
