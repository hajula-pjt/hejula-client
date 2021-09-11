import VALIDATIONS from "../constants/validations";
import { VALIDATION_CHECK_ITEM } from "../type";

export const getErrorMessage = (key: VALIDATION_CHECK_ITEM) => {
  return VALIDATIONS[key];
};

interface RoomSearchPath {
  guSeq: number;
  checkIn: string;
  checkOut: string;
  people: number;
  page: number;
  rows: number;
}

export const createRoomSearchPath = ({
  guSeq,
  checkIn,
  checkOut,
  people,
  page = 0,
  rows = 10,
}: RoomSearchPath) => {
  const result = `/search?guSeq=${guSeq}&checkIn=${checkIn}&checkOut=${checkOut}&people=${people}&page=${page}&rows=${rows}`;

  return result;
};
