import { FC } from "react";
import styled from "@emotion/styled";

interface text {
  title: string;
  text: string | number;
}

interface TextListProps {
  textList: text[];
}

const TextList: FC<TextListProps> = ({ textList }) => {
  return (
    <ul>
      {textList.map(({ title, text }) => (
        <TextBox key={title}>
          <em>{title}</em>
          <span>{text}</span>
        </TextBox>
      ))}
    </ul>
  );
};

export const TextBox = styled.li`
  display: flex;
  justify-content: space-between;
  position: relative;

  & + & {
    margin-top: 10px;
  }

  em,
  span {
    display: block;
  }

  em {
    margin-bottom: 10px;
    font-size: 16px;
  }

  span {
    font-size: 14px;
    color: #717171;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 22px;
  }
`;

export default TextList;
