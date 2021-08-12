export type ClickField =
  | "gu"
  | "people"
  | "checkIn"
  | "checkOut"
  | "clickField"
  | "clickedGu";

export interface RoomSearchChangeParams {
  name: ClickField;
  value: string | CheckInOut | number | ClickedGu | null;
}

export type VALIDATION_CHECK_ITEM =
  | "checkIn"
  | "checkOut"
  | "people"
  | "clickedGu";

export interface ClickedGu {
  id: number;
  name: string;
}
export interface CheckInOut {
  year: number;
  month: number;
  date: number;
}

export interface RoomSearchFormFields {
  gu: string | null;
  checkIn: CheckInOut | null;
  checkOut: CheckInOut | null;
  people: string | null;
}
