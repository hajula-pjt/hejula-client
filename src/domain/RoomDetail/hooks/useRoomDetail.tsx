import { useEffect, useState } from "react";

import * as api from "../../../api/roomDetail/getRoomDetail";

import {
  IRoomDetail,
  IUseRoomDetail,
  IUseRoomDetailReturnValue,
} from "../type";

const useRoomDetail = ({
  id,
  checkInDate,
  checkOutDate,
}: IUseRoomDetail): IUseRoomDetailReturnValue => {
  const [detail, setDetail] = useState<IRoomDetail>(null);

  const getRoomDetail = async ({ id }: { id: string }) => {
    const room = await api.getRoomDetail({ id });

    setDetail((prev) => ({ ...prev, ...room?.accommodation }));
  };

  const getRoomPrices = async ({
    id,
    checkInDate,
    checkOutDate,
  }: IUseRoomDetail) => {
    const priceList = await api.getRoomPrices({
      id,
      checkInDate,
      checkOutDate,
    });

    setDetail((prev) => ({ ...prev, priceList }));
  };

  useEffect(() => {
    getRoomDetail({ id });
    getRoomPrices({ id, checkInDate, checkOutDate });
  }, [id, checkInDate, checkOutDate]);

  return { detail };
};

export default useRoomDetail;
