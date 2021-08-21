import { BACKEND_SERVER_URL } from "../constants/server";

export const myLoader = ({ src }: { src: string }) => {
  return `${BACKEND_SERVER_URL}/accommodation/image/${src}`;
};
