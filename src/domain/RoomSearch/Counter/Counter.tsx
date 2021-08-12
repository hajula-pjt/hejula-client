import React from "react";

import styled from "@emotion/styled";

import CounterItem from "./CounterItem";

import { CounterKeys } from "./hooks/useCounter";

interface CounterProps {
  adultCount: number;
  childrenCount: number;
  onMinusClick: ({ key }: { key: CounterKeys }) => void;
  onPlusClick: ({ key }: { key: CounterKeys }) => void;
}

const Counter = ({
  adultCount,
  childrenCount,
  onMinusClick,
  onPlusClick,
}: CounterProps) => {
  return (
    <Wrap>
      <CounterItem
        title="성인"
        description="만 13세 이상"
        count={adultCount}
        onMinusClick={() => onMinusClick({ key: "adult" })}
        onPlusClick={() => onPlusClick({ key: "adult" })}
      />
      <CounterItem
        title="어린이"
        description="만 2세~12세"
        count={childrenCount}
        onMinusClick={() => onMinusClick({ key: "children" })}
        onPlusClick={() => onPlusClick({ key: "children" })}
      />
    </Wrap>
  );
};

const Wrap = styled.ul`
  position: absolute;
  top: 110%;
  right: 0;
  padding: 20px;
  max-width: 350px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
`;

export default Counter;
