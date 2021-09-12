import axios from "axios";

import { IUseRoomDetail } from "../../domain/RoomDetail/type";

export const getRoomDetail = async ({ id }: { id: string }) => {
  const result = await axios.get(`/accommodation/${id}`);

  return result.data.resultValue;
};

export const getRoomPrices = async ({
  id,
  checkInDate,
  checkOutDate,
}: IUseRoomDetail) => {
  const result = await axios.get(
    `/accommodation/price/${id}/${checkInDate}/${checkOutDate}`
  );

  return result.data.resultValue;
};
