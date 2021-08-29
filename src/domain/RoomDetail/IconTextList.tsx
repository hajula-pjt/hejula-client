import { FC } from "react";
import styled from "@emotion/styled";
import { IconType } from "react-icons/lib";

interface text {
  title: string;
  text: string;
  Icon: IconType;
}

interface IconTextListProps {
  textList: text[];
}

const IconTextList: FC<IconTextListProps> = ({ textList }) => {
  return (
    <ul>
      {textList.map(({ title, text, Icon }) => (
        <TextBox key={title}>
          <Icon />
          <em>{title}</em>
          <span>{text}</span>
        </TextBox>
      ))}
    </ul>
  );
};

export const TextBox = styled.li`
  position: relative;
  padding-left: 40px;

  & + & {
    margin-top: 25px;
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

export default IconTextList;
