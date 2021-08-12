import dayjs from "dayjs";

export const getWeeks = (month: number) => {
  type day = {
    date: number;
    checked: boolean;
  };
  type days = day[];

  const days = Array(dayjs(`2021-${month}`).daysInMonth())
    .fill(0)
    .map((_number, index) => index + 1);

  const isLastDayOfWeek = (day: number) => day === 6;
  const isLastDayOfMonth = (date: number) => date === days.length;

  let weeks: days[] = [];
  let week: days = Array(7).fill(0);

  days.forEach((date) => {
    const day = dayjs(`2021-${month}-${date}`).day();

    week[day] = {
      date,
      checked: false,
    };

    if (isLastDayOfWeek(day) || isLastDayOfMonth(date)) {
      weeks.push(week);
      week = Array(7).fill(0);
    }
  });

  return weeks;
};
