import axios from "axios";

export const BACKEND_SERVER_URL = "http://49.247.213.4:8080";

const server = axios.create({
  baseURL: BACKEND_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default server;
