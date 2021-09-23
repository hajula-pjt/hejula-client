import { ChangeEvent, useState } from "react";
import { postLogin } from "../../../api/user/postLogin";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../utils/localStorage";

const useLogin = ({
  setCookie,
  setUser,
  onLoginFormClose,
  onToggleMenuClose,
}) => {
  const [loginFields, setLoginFields] = useState({
    id: "",
    password: "",
  });

  const { id, password } = loginFields;

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await postLogin({ id, password });
      const accessToken = result.token;

      const { nickname, userId, userSeq } = result;

      setCookie({ key: "Authorization", value: accessToken });

      setLocalStorageItem({
        key: "userInfo",
        value: JSON.stringify({ nickname, userId, userSeq }),
      });

      setLoginError(null);

      setUser(getLocalStorageItem({ key: "userInfo" }));

      onLoginFormClose();
      onToggleMenuClose();
    } catch (e) {
      setLoginError(e.message);
    }
  };

  return { loginFields, loginError, handleChange, handleSubmit };
};

export default useLogin;
