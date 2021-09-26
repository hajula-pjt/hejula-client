import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { postAdminLogin } from "../../src/api/user/postAdminLogin";
import LoginForm from "../../src/domain/Login/LoginForm";

import {
  useLogin,
  useLoginCookie,
  useLoginUserInfo,
} from "../../src/domain/Login/hooks";

import { TCookieKey, TStotageKey } from "../../src/domain/Login/type";
import { setUserInfo } from "../../src/domain/Login/utils";

const Admin = () => {
  const router = useRouter();

  const cookieKey: TCookieKey = "AdminAuthorization";
  const storageKey: TStotageKey = "adminUserInfo";

  const { handleSetCookie } = useLoginCookie({ cookieKey });
  const { user, handleSetUser } = useLoginUserInfo({ storageKey });
  const { loginFields, loginError, handleChange, handleSetLoginError } =
    useLogin();

  const { id, password } = loginFields;

  useEffect(() => {
    if (user) {
      router.push("/admin/home");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const result = await postAdminLogin({ id, password });

      setUserInfo({
        userInfo: result,
        cookieKey: "AdminAuthorization",
        storageKey: "adminUserInfo",
        setUser: handleSetUser,
        setCookie: handleSetCookie,
      });
    } catch (e) {
      handleSetLoginError({ message: e?.message });
    }
  };

  if (user) {
    return null;
  }

  return (
    <Container>
      <Title>관리자 로그인</Title>
      <LoginForm
        loginFields={loginFields}
        onSubmit={handleSubmit}
        onChange={handleChange}
        loginError={loginError}
      />
    </Container>
  );
};

const Container = styled.main`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 500px;
  transform: translate(-50%, -50%);
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 30px;
  text-align: center;
`;

export default Admin;
