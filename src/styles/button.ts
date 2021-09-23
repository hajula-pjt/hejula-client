import styled from "@emotion/styled";

import { colorPalette } from "../config/color-config";

export const ButtonBox = styled.p`
  margin-top: 15px;
`;

export const Button = styled.button`
  padding: 15px;
  width: 100%;
  color: #fff;
  background: ${colorPalette.point};
  border-radius: 20px;
`;
