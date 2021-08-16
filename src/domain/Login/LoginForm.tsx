import React from "react";

import styled from "@emotion/styled";

import { colorPalette } from "../../config/color-config";

interface Props {
  id: string;
  password: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm = ({ id, password, handleSubmit, handleChange }: Props) => {
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

export default LoginForm;
