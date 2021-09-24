export type TStotageKey = "userInfo" | "adminUserInfo";
export type TCookieKey = "Authorization" | "AdminAuthorization";

export interface IloginFields {
  id: string;
  password: string;
}

export interface IUserInfo {
  nickname: string;
  userId: string;
  userSeq: number;
}
