/**
 * @jest-environment jsdom
 */

import React from "react";

import { fireEvent, render } from "@testing-library/react";

import CalendarContainer from "./CalendarContainer";

import * as calendarUtil from "../../../utils/calendar-util";

import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  LAST_MONTH,
  NEXT_MONTH,
} from "../../../constants/calendar";

describe("CalendarContainer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const createCalendarContainer = () => render(<CalendarContainer />);

  it("현재달과 다음달이 표시됩니다", () => {
    const { queryByText } = createCalendarContainer();

    expect(
      queryByText(
        `${calendarUtil.dateFormat({
          date: `${CURRENT_YEAR}-${CURRENT_MONTH}`,
          format: "YYYY년 M월",
        })}`
      )
    ).not.toBeNull();
    expect(
      queryByText(
        `${calendarUtil.dateFormat({
          date: `${CURRENT_YEAR}-${NEXT_MONTH}`,
          format: "YYYY년 M월",
        })}`
      )
    ).not.toBeNull();
  });

  it("Prev 버튼을 클릭하면 '현재 달 - 1' 바로 전달으로 변경됩니다", () => {
    const { queryByText, getByText } = createCalendarContainer();

    fireEvent.click(getByText("prev"));

    expect(
      queryByText(
        `${calendarUtil.dateFormat({
          date: `${CURRENT_YEAR}-${CURRENT_MONTH - 1}`,
          format: "YYYY년 M월",
        })}`
      )
    ).not.toBeNull();
    expect(
      queryByText(
        `${calendarUtil.dateFormat({
          date: `${CURRENT_YEAR}-${NEXT_MONTH - 1}`,
          format: "YYYY년 M월",
        })}`
      )
    ).not.toBeNull();
  });

  context("현재 달이 12월이 아닐때 Next 버튼을 클릭한 경우", () => {
    it("'현재 달 + 1' 으로 변경됩니다", () => {
      const { queryByText, getByText } = createCalendarContainer();

      fireEvent.click(getByText("next"));

      expect(
        queryByText(
          `${calendarUtil.dateFormat({
            date: `${CURRENT_YEAR}-${CURRENT_MONTH + 1}`,
            format: "YYYY년 M월",
          })}`
        )
      ).not.toBeNull();
      expect(
        queryByText(
          `${calendarUtil.dateFormat({
            date: `${CURRENT_YEAR}-${NEXT_MONTH + 1}`,
            format: "YYYY년 M월",
          })}`
        )
      ).not.toBeNull();
    });
  });

  context(
    "현재 달력의 날짜가 '2021년 12월'일때 Next 버튼을 클릭한 경우",
    () => {
      const clickCount = LAST_MONTH - CURRENT_MONTH;

      it("현재 달력은 '2022년 1월'이 된다", () => {
        const { getByTestId, getByText } = createCalendarContainer();

        Array(clickCount + 1)
          .fill(null)
          .forEach(() => fireEvent.click(getByText("next")));

        const currentCalendarHeader = getByTestId("current-calendar-header");

        expect(currentCalendarHeader.textContent).toBe("2022년 1월");
      });
    }
  );

  context(
    "다음 달력의 날짜가 '2021년 12월'일때 Next 버튼을 클릭한 경우",
    () => {
      const clickCount = LAST_MONTH - NEXT_MONTH;

      it("다음 달력은 '2022년 1월'이 된다", async () => {
        const { getByText, getByTestId } = createCalendarContainer();

        Array(clickCount + 1)
          .fill(null)
          .forEach(() => fireEvent.click(getByText("next")));

        const nextCalendarHeader = getByTestId("next-calendar-header");

        expect(nextCalendarHeader.textContent).toBe("2022년 1월");
      });
    }
  );

  context("현재 달력의 날짜가 '2021년 1월'일때 Prev 버튼을 클릭한 경우", () => {
    const clickCount = CURRENT_MONTH;

    it("현재 달력은 '2020년 12월'이 된다", () => {
      const { getByTestId, getByText } = createCalendarContainer();

      Array(clickCount)
        .fill(null)
        .forEach(() => fireEvent.click(getByText("prev")));

      const currentCalendarHeader = getByTestId("current-calendar-header");

      expect(currentCalendarHeader.textContent).toBe("2020년 12월");
    });
  });

  context("다음 달력의 날짜가 '2021년 1월'일때 Prev 버튼을 클릭한 경우", () => {
    const clickCount = NEXT_MONTH;

    it("다음 달력은 '2020년 12월'이 된다", async () => {
      const { getByText, getByTestId } = createCalendarContainer();

      Array(clickCount)
        .fill(null)
        .forEach(() => fireEvent.click(getByText("prev")));

      const nextCalendarHeader = getByTestId("next-calendar-header");

      expect(nextCalendarHeader.textContent).toBe("2020년 12월");
    });
  });
});
