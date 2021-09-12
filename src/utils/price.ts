import { RoomPrice } from "../domain/RoomDetail/type";

export const getPriceSum = ({ priceList }: { priceList: RoomPrice[] }) => {
  const sum = priceList
    ?.map((price) => price.price)
    .reduce((prevPrice, nextPrice) => prevPrice + nextPrice);

  return sum?.toLocaleString();
};
