import React, { useCallback } from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

import {
  dateFormat,
  getToday,
  isExistedDate,
} from "../../../utils/calendar-util";

import { TDays } from "./type";
import { ICheckInOut, IRoomSearchFormFields } from "../SearchForm/type";

const WEEKS = ["일", "월", "화", "수", "목", "금", "토"];
interface CalendarItemProps {
  year: number;
  month: number;
  weeks: TDays[];
  testId: string;
  fields: IRoomSearchFormFields;
  onChange: ({ value }: { value: ICheckInOut }) => void;
  onClick: ({
    year,
    month,
    date,
  }: {
    year: number;
    month: number;
    date: number | null;
  }) => void;
}

const CalendarItem = ({
  year,
  month,
  weeks,
  testId,
  fields,
  onClick,
}: CalendarItemProps) => {
  const checkLessThan = useCallback(({ originDate, targetDate }) => {
    const result = targetDate < originDate;

    return result;
  }, []);

  const handleClick = useCallback(
    ({ year, month, date }) => {
      const isLessThanToday = checkLessThan({
        originDate: getToday(),
        targetDate: dateFormat({
          date: `${year}-${month}-${date}`,
          format: "",
        }),
      });

      if (isLessThanToday) {
        return false;
      }

      onClick({ year, month, date: date });
    },
    [checkLessThan, onClick]
  );

  const isClicked = useCallback(
    ({
      year,
      month,
      date,
    }: {
      year: number;
      month: number;
      date: number | null;
    }) => {
      if (date === null) {
        return false;
      }

      const { checkIn, checkOut } = fields;

      if (checkIn?.month === month && checkIn?.date === date) {
        return true;
      }

      if (checkOut?.month === month && checkOut?.date === date) {
        return true;
      }
    },
    [fields]
  );

  return (
    <CalendarSection>
      <Title>
        <span data-testid={testId}>
          {dateFormat({ date: `${year}-${month}`, format: "YYYY년 M월" })}
        </span>
      </Title>
      <Week>
        {WEEKS.map((day, index) => (
          <Day key={`month-${index}`} color="#999">
            {day}
          </Day>
        ))}
      </Week>
      {weeks.map((week, index) => {
        return (
          <Week key={index}>
            {week.map((day, index) => {
              return (
                <Day
                  key={`statyWeek-day-${index}`}
                  isButton={isExistedDate(day?.date || null)}
                  onClick={() => handleClick({ year, month, date: day.date })}
                  isClicked={isClicked({ year, month, date: day.date })}
                  disabled={checkLessThan({
                    originDate: getToday(),
                    targetDate: dateFormat({
                      date: `${year}-${month}-${day.date}`,
                      format: "",
                    }),
                  })}
                >
                  {day?.date || ""}
                </Day>
              );
            })}
          </Week>
        );
      })}
    </CalendarSection>
  );
};

interface FieldProps {
  color?: string;
  isButton?: boolean;
  isClicked?: boolean;
  disabled?: boolean;
}

const CalendarSection = styled.div({
  flex: 1,
  "& + &": {
    marginLeft: "4em",
  },
});

const Title = styled.p({
  padding: "1rem 0",
  textAlign: "center",
});

const Week = styled.ul({
  display: "flex",
});

const Day = styled.li<FieldProps>`
  flex: 1;
  padding: 1em;
  text-align: center;
  color: ${({ color }) => color};
  cursor: default;

  ${({ isClicked }) =>
    isClicked &&
    css`
      background: #000;
      color: #fff;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.25;
    `}

  ${({ isButton, isClicked, disabled }) =>
    isButton &&
    !isClicked &&
    !disabled &&
    css`
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    `}
`;

export default CalendarItem;
