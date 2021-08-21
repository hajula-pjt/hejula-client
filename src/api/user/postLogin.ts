import axios from "axios";

export const postLogin = ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  const result = axios.post("/user/signIn", {
    id,
    password,
  });

  return result;
};
