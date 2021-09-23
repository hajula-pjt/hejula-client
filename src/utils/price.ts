import { RoomPrice } from "../domain/RoomDetail/type";

export const priceFormat = ({ price }: { price: number }) => {
  return price?.toLocaleString();
};

export const getPriceSum = ({ prices }: { prices: RoomPrice[] }) => {
  const sum = prices
    ?.map((price) => price.price)
    .reduce((prevPrice, nextPrice) => prevPrice + nextPrice);

  return priceFormat({ price: sum });
};
