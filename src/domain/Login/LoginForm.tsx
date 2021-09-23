import React, { FC } from "react";

import styled from "@emotion/styled";

import { colorPalette } from "../../config/color-config";

import useLogin from "./hooks/useLogin";

interface ILoginForm {
  setCookie: ({ key, value }: { key: string; value: string }) => void;
  setUser: (value) => void;
  onLoginFormClose: () => void;
  onToggleMenuClose: () => void;
}

const LoginForm: FC<ILoginForm> = ({
  setCookie,
  setUser,
  onLoginFormClose,
  onToggleMenuClose,
}) => {
  const { loginFields, loginError, handleSubmit, handleChange } = useLogin({
    setCookie,
    setUser,
    onLoginFormClose,
    onToggleMenuClose,
  });

  const { id, password } = loginFields;

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        <input
          id="id"
          name="id"
          type="text"
          value={id}
          placeholder="id"
          onChange={handleChange}
        />
      </p>
      <p>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={handleChange}
        />
      </p>
      {loginError && <Error>{loginError}</Error>}
      <ButtonBox>
        <Button type="submit">로그인하기</Button>
      </ButtonBox>
    </Form>
  );
};

const Form = styled.form`
  p + p {
    margin-top: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #dcdcdc;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: #fff;
  border-radius: 10px;
  background: ${colorPalette.point};
`;

const Error = styled.p`
  color: ${colorPalette.point};
  text-align: center;
`;

export default LoginForm;
