import { useCallback, useEffect, useState } from "react";
import { CURRENT_MONTH, NEXT_MONTH } from "../../../../constants/calendar";
import { getCalendarState, getWeeks } from "../../../../utils/calendar-util";
import { days, SearchFormField, YearAndMonthType } from "../type/type";

export const useCurrentCalendar = () => {
  const [currentCalendar, setCurrentCalendar] = useState<YearAndMonthType>(
    getCalendarState({
      month: CURRENT_MONTH,
    })
  );

  const { year: currentYear, month: currentMonth } = currentCalendar;

  const handleCurrentCalendarChange = useCallback(
    ({ key, value }: { key: SearchFormField; value: number | days[] }) => {
      setCurrentCalendar((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  useEffect(() => {
    handleCurrentCalendarChange({
      key: "weeks",
      value: getWeeks({
        year: currentYear,
        month: currentMonth,
      }),
    });
  }, [currentMonth, currentYear, handleCurrentCalendarChange]);

  return {
    currentCalendar,
    currentYear,
    currentMonth,
    handleCurrentCalendarChange,
  };
};

export const useNextCalendar = () => {
  const [nextCalendar, setNextCalendar] = useState<YearAndMonthType>(
    getCalendarState({
      month: NEXT_MONTH,
    })
  );

  const { year: nextYear, month: nextMonth } = nextCalendar;

  const handleNextCalendarChange = useCallback(
    ({ key, value }: { key: SearchFormField; value: number | days[] }) => {
      setNextCalendar((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  useEffect(() => {
    handleNextCalendarChange({
      key: "weeks",
      value: getWeeks({
        year: nextYear,
        month: nextMonth,
      }),
    });
  }, [nextMonth, nextYear, handleNextCalendarChange]);

  return {
    nextCalendar,
    nextYear,
    nextMonth,
    handleNextCalendarChange,
  };
};
