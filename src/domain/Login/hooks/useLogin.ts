import { ChangeEvent, useState } from "react";

import { IloginFields } from "../type";

interface IUserLoginReturnValue {
  loginFields: IloginFields;
  loginError: string;
  handleChange: (e: React.FormEvent) => void;
  handleSetLoginError: ({ message }: { message: string }) => void;
}

const useLogin = (): IUserLoginReturnValue => {
  const [loginFields, setLoginFields] = useState<IloginFields>({
    id: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSetLoginError = ({ message }: { message: string }) => {
    setLoginError(message);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { loginFields, loginError, handleChange, handleSetLoginError };
};

export default useLogin;
