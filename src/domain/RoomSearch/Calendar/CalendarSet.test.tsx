/**
 * @jest-environment jsdom
 */

import React from "react";

import { fireEvent, render } from "@testing-library/react";

import CalendarSet from "./CalendarSet";

import * as calendarUtil from "../../../utils/calendar-util";

describe("Calendar", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const CURRENT_YEAR = 2021;
  const CURRENT_FIRST_MONTH = 7;
  const CURRENT_SECOND_MONTH = 8;

  const onPrevButtonClick = jest.fn();
  const onNextButtonClick = jest.fn();

  const currentCalendar = {
    year: CURRENT_YEAR,
    month: CURRENT_FIRST_MONTH,
    weeks: calendarUtil.getWeeks({
      year: CURRENT_YEAR,
      month: CURRENT_FIRST_MONTH,
    }),
  };

  const nextCalendar = {
    year: CURRENT_YEAR,
    month: CURRENT_SECOND_MONTH,
    weeks: calendarUtil.getWeeks({
      year: CURRENT_YEAR,
      month: CURRENT_SECOND_MONTH,
    }),
  };

  const createCalendarSet = () =>
    render(
      <CalendarSet
        currentCalendar={currentCalendar}
        nextCalendar={nextCalendar}
        onPrevButtonClick={onPrevButtonClick}
        onNextButtonClick={onNextButtonClick}
      />
    );

  it("이번달과 다음달이 표시됩니다", () => {
    const { queryByText } = createCalendarSet();

    expect(queryByText("2021년 7월")).not.toBeNull();
    expect(queryByText("2021년 8월")).not.toBeNull();
  });

  it("Prev 버튼을 클릭하면 'onPrevButtonClick' 함수가 실행됩니다", () => {
    const { getByText } = createCalendarSet();

    fireEvent.click(getByText("prev"));

    expect(onPrevButtonClick).toBeCalled();
  });

  it("Next 버튼을 클릭하면 'onNextButtonClick' 함수가 실행됩니다", () => {
    const { getByText } = createCalendarSet();

    fireEvent.click(getByText("next"));

    expect(onNextButtonClick).toBeCalled();
  });
});
