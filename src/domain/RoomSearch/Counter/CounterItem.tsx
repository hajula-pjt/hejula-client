import React from "react";

import styled from "@emotion/styled";
import { colorPalette } from "../../../config/color-config";

interface CounterItemProps {
  title: string;
  description: string;
  count: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
}

const CounterItem = ({
  title,
  description,
  count,
  onMinusClick,
  onPlusClick,
}: CounterItemProps) => {
  return (
    <Item>
      <Text>
        <em>{title}</em>
        <span>{description}</span>
      </Text>
      <Counter>
        <button type="button" onClick={onMinusClick}>
          -
        </button>
        <span>{count}</span>
        <button type="button" onClick={onPlusClick}>
          +
        </button>
      </Counter>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 10px;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;

  em {
    font-size: 16px;
  }

  span {
    color: #999;
  }

  em + span {
    margin-top: 5px;
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;

  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #dcdcdc;

    &:hover {
      color: ${colorPalette.point};
      border-color: ${colorPalette.point};
    }
  }

  & > * + * {
    margin-left: 10px;
  }
`;

export default CounterItem;
