import VALIDATIONS from "../domain/RoomSearch/SearchForm/constants/validations";
import { TInputCheckList } from "../domain/RoomSearch/SearchForm/type";

export const getErrorMessage = (key: TInputCheckList) => {
  return VALIDATIONS[key];
};

interface RoomSearchPath {
  guSeq: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  page: number;
  rows: number;
}
interface RoomDetailPath {
  guSeq: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: string;
  childrenCount: string;
}

interface IRoomReservationConfirm {
  accommodationSeq: number;
  userSeq: string;
  checkInDate: string;
  checkOutDate: string;
  adultCount: string;
  childrenCount: string;
}

export const createRoomSearchPath = ({
  guSeq,
  checkInDate,
  checkOutDate,
  adultCount,
  childrenCount,
  page = 0,
  rows = 10,
}: RoomSearchPath) => {
  const result = `/search?guSeq=${guSeq}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adultCount=${adultCount}&childrenCount=${childrenCount}&page=${page}&rows=${rows}`;

  return result;
};

export const createRoomDetailPath = ({
  guSeq,
  checkInDate,
  checkOutDate,
  adultCount,
  childrenCount,
}: RoomDetailPath) => {
  const result = `/detail/${guSeq}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adultCount=${adultCount}&childrenCount=${childrenCount}`;

  return result;
};

export const createRoomReservationConfirmPath = ({
  accommodationSeq,
  userSeq,
  checkInDate,
  checkOutDate,
  adultCount,
  childrenCount,
}: IRoomReservationConfirm) => {
  const result = `/reservationConfirm?accommodationSeq=${accommodationSeq}&customerSeq=${userSeq}&checkinDate=${checkInDate}&checkoutDate=${checkOutDate}&adultCount=${adultCount}&childrenCount=${childrenCount}`;

  return result;
};
