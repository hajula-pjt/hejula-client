/**
 * @jest-environment jsdom
 */

import React from "react";

import { render } from "@testing-library/react";

import Counter from "./Counter";

describe("Counter", () => {
  const onMinusClick = jest.fn();
  const onPlusClick = jest.fn();

  const createCounter = () =>
    render(
      <Counter
        adultCount={0}
        childrenCount={0}
        onMinusClick={onMinusClick}
        onPlusClick={onPlusClick}
      />
    );

  it("인원수 카운터가 렌더링됩니다", () => {
    const { queryByText } = createCounter();

    const counters = ["성인", "어린이"];

    counters.forEach((counter) => {
      expect(queryByText(counter)).not.toBeNull();
    });
  });
});
