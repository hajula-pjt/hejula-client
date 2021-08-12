import server from "../server";

export const postLogin = ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  server.get(`/user/signIn?id=${id}&password=${password}`);
};
