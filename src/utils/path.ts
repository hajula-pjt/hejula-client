import VALIDATIONS from "../domain/RoomSearch/SearchForm/constants/validations";
import { TInputCheckList } from "../domain/RoomSearch/SearchForm/type";

export const getErrorMessage = (key: TInputCheckList) => {
  return VALIDATIONS[key];
};

interface RoomSearchPath {
  guSeq: number;
  checkInDate: string;
  checkOutDate: string;
  people: number;
  page: number;
  rows: number;
}
interface RoomDetailPath {
  guSeq: number;
  checkInDate: string;
  checkOutDate: string;
}

export const createRoomSearchPath = ({
  guSeq,
  checkInDate,
  checkOutDate,
  people,
  page = 0,
  rows = 10,
}: RoomSearchPath) => {
  const result = `/search?guSeq=${guSeq}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&people=${people}&page=${page}&rows=${rows}`;

  return result;
};

export const createRoomDetailPath = ({
  guSeq,
  checkInDate,
  checkOutDate,
}: RoomDetailPath) => {
  const result = `/detail/${guSeq}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

  return result;
};
