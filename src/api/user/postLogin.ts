import axios from "axios";

export interface IPostLoginResultValue {
  nickname: string;
  token: string;
  userId: string;
  userSeq: number;
}

export const postLogin = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<IPostLoginResultValue> => {
  const result = await axios.post("/user/signIn", {
    id,
    password,
  });

  if (!result.data.completed) {
    throw new Error("아이디 또는 비밀번호를 확인해주세요");
  }

  return result.data.resultValue;
};
