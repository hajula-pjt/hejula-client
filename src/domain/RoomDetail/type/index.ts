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
}

export interface IAdmin {
  adminSeq: number;
  id: string;
  nickname: string;
  thisMonthRateOperation: number;
  thisMonthSales: number;
  thisMonthVisitors: number;
}
