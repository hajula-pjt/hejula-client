export type TDay = {
  date: number | null;
  checked: boolean;
};

export type TDays = TDay[];

export interface IYearAndMonth {
  year: number;
  month: number;
  weeks: TDays[];
}

export type TSearchFormField = "year" | "month" | "weeks";
