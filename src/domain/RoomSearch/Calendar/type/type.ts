export type day = {
  date: number | null;
  checked: boolean;
};

export type days = day[];

export interface YearAndMonthType {
  year: number;
  month: number;
  weeks: days[];
}

export type SearchFormField = "year" | "month" | "weeks";
