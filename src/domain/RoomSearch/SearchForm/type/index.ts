export type TClickField =
  | "gu"
  | "people"
  | "checkIn"
  | "checkOut"
  | "clickField"
  | "clickedGu"
  | null;

export interface RoomSearchChangeParams {
  name: TClickField;
  value: string | ICheckInOut | number | IClickedGu | null;
}

export type TVALIDATION_CHECK_ITEM =
  | "checkIn"
  | "checkOut"
  | "people"
  | "clickedGu";

export interface IClickedGu {
  id: number;
  name: string;
}
export interface ICheckInOut {
  year: number;
  month: number;
  date: number;
}

export interface IRoomSearchFormFields {
  gu: number | null;
  checkIn: ICheckInOut | null;
  checkOut: ICheckInOut | null;
  people: number;
  clickField: TClickField | null;
  clickedGu: IClickedGu | null;
}
