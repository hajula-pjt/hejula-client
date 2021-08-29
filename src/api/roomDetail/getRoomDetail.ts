import axios from "axios";

export const getRoomDetail = async ({ id }: { id: string }) => {
  const result = await axios.get(`/accommodation/${id}`);

  return result.data.resultValue;
};
