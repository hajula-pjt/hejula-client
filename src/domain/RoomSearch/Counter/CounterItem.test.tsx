/**
 * @jest-environment jsdom
 */

import React from "react";

import { fireEvent, render } from "@testing-library/react";

import CounterItem from "./CounterItem";

describe("Counter", () => {
  const onMinusClick = jest.fn();
  const onPlusClick = jest.fn();

  const createCounter = () =>
    render(
      <CounterItem
        title="성인"
        description="만 13세 이상"
        count={0}
        onMinusClick={() => onMinusClick({ key: "adult" })}
        onPlusClick={() => onPlusClick({ key: "adult" })}
      />
    );

  it("카운터 타이틀, 설명글, 카운터 갯수가 렌더링됩니다", () => {
    const { queryByText } = createCounter();

    expect(queryByText("성인")).not.toBeNull();
    expect(queryByText("만 13세 이상")).not.toBeNull();
    expect(queryByText(0)).not.toBeNull();
  });

  it("`+` 버튼을 클릭하면 onPlusClick 함수가 실행됩니다", () => {
    const { getByText } = createCounter();

    fireEvent.click(getByText("+"));

    expect(onPlusClick).toBeCalledWith({
      key: "adult",
    });
  });
});
