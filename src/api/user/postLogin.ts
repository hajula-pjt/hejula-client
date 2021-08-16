import server from "../server";

export const postLogin = ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  server.post(
    "/user/signIn",
    {
      id,
      password,
    },
    {
      withCredentials: true,
    }
  );
};
