import { useCallback, useEffect, useState } from "react";

import { getRoomsPrice } from "../../../api/price/getRoomsPrice";

import { IPrice } from "../type";

const useRoomPrices = ({ accommodationSeq, checkinDate, checkoutDate }) => {
  const [roomPrices, setRoomPrices] = useState<IPrice[] | null>(null);

  const getPrices = useCallback(async () => {
    const prices = await getRoomsPrice({
      accommodationSeq,
      checkinDate,
      checkoutDate,
    });

    setRoomPrices(prices);
  }, [accommodationSeq, checkinDate, checkoutDate]);

  useEffect(() => {
    getPrices();
  }, [getPrices]);

  return { roomPrices, getPrices };
};

export default useRoomPrices;
