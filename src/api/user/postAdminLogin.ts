import axios from "axios";

export const postAdminLogin = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  const result = await axios.post("/admin/signIn", {
    id,
    password,
  });

  if (!result.data.completed) {
    throw new Error("아이디 또는 비밀번호를 확인해주세요");
  }

  return result.data.resultValue;
};
