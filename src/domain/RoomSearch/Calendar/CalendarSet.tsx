import React, { useCallback } from "react";

import styled from "@emotion/styled";

import CalendarItem from "./CelendarItem";

import { IYearAndMonth } from "./type";
import {
  ICheckInOut,
  IRoomSearchFormFields,
  TClickField,
} from "../SearchForm/type";

interface CalendarProps {
  currentCalendar: IYearAndMonth;
  nextCalendar: IYearAndMonth;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  onChange: ({ value }: { value: ICheckInOut }) => void;
  fields: IRoomSearchFormFields;
  onClickedFieldChange: ({ field }: { field: TClickField }) => void;
}

const CalendarSet = ({
  currentCalendar,
  nextCalendar,
  onPrevButtonClick,
  onNextButtonClick,
  onChange,
  fields,
  onClickedFieldChange,
}: CalendarProps) => {
  const {
    year: firstYear,
    month: firstMonth,
    weeks: firstWeeks,
  } = currentCalendar;

  const {
    year: secondYear,
    month: secondMonth,
    weeks: secondWeeks,
  } = nextCalendar;

  const HandleClickCurrentMonth = useCallback(
    ({ year, month, date }) => {
      onChange({
        value: {
          year,
          month,
          date,
        },
      });

      onClickedFieldChange({ field: "checkOut" });
    },
    [onChange, onClickedFieldChange]
  );

  const HandleClickNextMonth = useCallback(
    ({ year, month, date }) => {
      onChange({
        value: {
          year,
          month,
          date,
        },
      });
    },
    [onChange]
  );

  return (
    <Wrap>
      <PageNation>
        <button type="button" onClick={onPrevButtonClick}>
          prev
        </button>
        <button type="button" onClick={onNextButtonClick}>
          next
        </button>
      </PageNation>
      <CalendarItem
        year={firstYear}
        month={firstMonth}
        weeks={firstWeeks}
        testId="current-calendar-header"
        onChange={onChange}
        onClick={HandleClickCurrentMonth}
        fields={fields}
      />
      <CalendarItem
        year={secondYear}
        month={secondMonth}
        weeks={secondWeeks}
        testId="next-calendar-header"
        onChange={onChange}
        onClick={HandleClickNextMonth}
        fields={fields}
      />
    </Wrap>
  );
};

const PageNation = styled.p`
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 2.9em;
  padding: 0 3em;
  width: 100%;
`;

const Wrap = styled.div({
  display: "flex",
  position: "absolute",
  top: "110%",
  left: 0,
  width: "100%",
  padding: "2em",
  borderRadius: "2rem",
  boxShadow: "1px 10px 10px rgba(0,0,0,0.1)",
  background: "#fff",
});

export default CalendarSet;
