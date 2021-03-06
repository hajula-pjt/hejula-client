import { css } from "@emotion/react";
import ResetStyle from "./ResetCss";

const globalStyle = css`
  ${ResetStyle}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    font-size: 14px;
    font-family: "Noto Sans KR", sans-serif;
  }

  input {
    padding: 0;
    outline: none;
  }

  em {
    font-style: normal;
    font-weight: normal;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  input {
    border: none;
    background: none;
  }
`;

export default globalStyle;
