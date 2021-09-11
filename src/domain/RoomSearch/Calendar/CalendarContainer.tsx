import React, { useCallback } from "react";

import { isFirstMonth, isLastMonth } from "../../../utils/calendar-util";

import {
  ICheckInOut,
  TClickField,
  IRoomSearchFormFields,
} from "../SearchForm/type";

import CalendarSet from "./CalendarSet";

import { useCurrentCalendar, useNextCalendar } from "./hooks/useCalendar";

const CalendarContainer = ({
  fields,
  onChange,
  onClickedFieldChange,
}: {
  fields: IRoomSearchFormFields;
  onChange: ({ value }: { value: ICheckInOut }) => void;
  onClickedFieldChange: ({ field }: { field: TClickField }) => void;
}) => {
  const {
    currentCalendar,
    currentYear,
    currentMonth,
    handleCurrentCalendarChange,
  } = useCurrentCalendar();

  const { nextCalendar, nextYear, nextMonth, handleNextCalendarChange } =
    useNextCalendar();

  const handlePrevButtonClick = useCallback(() => {
    if (isFirstMonth(currentMonth)) {
      handleCurrentCalendarChange({ key: "year", value: currentYear - 1 });
      handleCurrentCalendarChange({ key: "month", value: 12 });
      handleNextCalendarChange({
        key: "month",
        value: nextMonth - 1,
      });
      return;
    }

    if (isFirstMonth(nextMonth)) {
      handleNextCalendarChange({ key: "year", value: nextYear - 1 });
      handleCurrentCalendarChange({ key: "month", value: currentMonth - 1 });
      handleNextCalendarChange({
        key: "month",
        value: 12,
      });
      return;
    }

    handleCurrentCalendarChange({ key: "month", value: currentMonth - 1 });
    handleNextCalendarChange({ key: "month", value: nextMonth - 1 });
  }, [
    currentYear,
    currentMonth,
    nextMonth,
    nextYear,
    handleCurrentCalendarChange,
    handleNextCalendarChange,
  ]);

  const handleNextButtonClick = useCallback(() => {
    if (isLastMonth(currentMonth)) {
      handleCurrentCalendarChange({ key: "year", value: currentYear + 1 });
      handleCurrentCalendarChange({ key: "month", value: 1 });

      handleNextCalendarChange({
        key: "month",
        value: nextMonth + 1,
      });
      return;
    }

    if (isLastMonth(nextMonth)) {
      handleNextCalendarChange({ key: "year", value: nextYear + 1 });
      handleNextCalendarChange({
        key: "month",
        value: 1,
      });

      handleCurrentCalendarChange({ key: "month", value: currentMonth + 1 });
      return;
    }

    handleCurrentCalendarChange({ key: "month", value: currentMonth + 1 });
    handleNextCalendarChange({ key: "month", value: nextMonth + 1 });
  }, [
    currentYear,
    nextYear,
    currentMonth,
    nextMonth,
    handleCurrentCalendarChange,
    handleNextCalendarChange,
  ]);

  return (
    <CalendarSet
      currentCalendar={currentCalendar}
      nextCalendar={nextCalendar}
      onPrevButtonClick={handlePrevButtonClick}
      onNextButtonClick={handleNextButtonClick}
      fields={fields}
      onChange={onChange}
      onClickedFieldChange={onClickedFieldChange}
    />
  );
};

export default CalendarContainer;
