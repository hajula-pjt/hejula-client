import dayjs from "dayjs";

import { CURRENT_YEAR, FIRST_MONTH, LAST_MONTH } from "../constants/calendar";
import { days } from "../domain/RoomSearch/Calendar/type/type";

const isLastDayOfWeek = (day: number) => day === 6;
const isLastDayOfMonth = ({ date, days }: { date: number; days: number[] }) =>
  date === days.length;

const getDays = ({
  year,
  month,
}: {
  year: number;
  month: number;
}): number[] => {
  const result = Array(dayjs(`${year}-${month}`).daysInMonth())
    .fill(0)
    .map((_number, index) => index + 1);

  return result;
};

export const getWeeks = ({
  month,
  year,
}: {
  month: number;
  year: number;
}): days[] => {
  const days = getDays({ year, month });

  let weeks: days[] = [];
  let week: days = Array(7).fill({
    date: null,
  });

  days.forEach((date) => {
    const day = dayjs(`${year}-${month}-${date}`).day();

    week[day] = {
      date,
      checked: false,
    };

    if (isLastDayOfWeek(day) || isLastDayOfMonth({ date, days })) {
      weeks.push(week);
      week = Array(7).fill({
        date: null,
      });
    }
  });

  return weeks;
};

export const isExistedDate = (date: number | null): boolean =>
  date ? true : false;

export const isLastMonth = (month: number) => {
  return month === LAST_MONTH;
};

export const isFirstMonth = (month: number) => {
  return month === FIRST_MONTH;
};

export const getCalendarState = ({ month }: { month: number }) => {
  const result = {
    year: CURRENT_YEAR,
    month,
    weeks: getWeeks({ year: CURRENT_YEAR, month }),
  };

  return result;
};

export const getToday = () => {
  return dayjs().format();
};

export const dateFormat = ({
  date,
  format,
}: {
  date: string;
  format: string;
}) => {
  const result = dayjs(date).format(format);

  return result;
};
