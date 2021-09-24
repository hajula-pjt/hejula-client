import React, { FC } from "react";

import styled from "@emotion/styled";

import { colorPalette } from "../../config/color-config";

import { IloginFields } from "./type";

interface ILoginForm {
  loginFields: IloginFields;
  loginError: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (e: React.FormEvent) => void;
}

const LoginForm: FC<ILoginForm> = ({
  loginFields,
  loginError,
  onSubmit,
  onChange,
}) => {
  const { id, password } = loginFields;

  return (
    <Form onSubmit={onSubmit}>
      <p>
        <input
          id="id"
          name="id"
          type="text"
          value={id}
          placeholder="id"
          onChange={onChange}
        />
      </p>
      <p>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={onChange}
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
