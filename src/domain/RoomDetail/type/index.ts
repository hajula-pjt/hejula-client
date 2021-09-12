export interface RoomPrice {
  day: number;
  fullDay: string;
  month: number;
  price: number;
}
export interface IRoomDetail {
  max: number;
  bathroom: number;
  bedroom: number;
  information: string;
  checkinTime: string;
  checkoutTime: string;
  selfCheckinWay: string;
  admin: IAdmin;
  rating: number;
  accommodationSeq: number;
  priceList: RoomPrice[];
}

export interface IAdmin {
  adminSeq: number;
  id: string;
  nickname: string;
  thisMonthRateOperation: number;
  thisMonthSales: number;
  thisMonthVisitors: number;
}

export interface IUseRoomDetail {
  id: string;
  checkInDate: string;
  checkOutDate: string;
}
export interface IUseRoomDetailReturnValue {
  detail: IRoomDetail;
}
