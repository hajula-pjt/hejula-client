import axios from "axios";

export const getRoomsPrice = async ({
  accommodationSeq,
  checkinDate,
  checkoutDate,
}: {
  accommodationSeq: string;
  checkinDate: string;
  checkoutDate: string;
}) => {
  const result = await axios.get(
    `/accommodation/price/${accommodationSeq}/${checkinDate}/${checkoutDate}`
  );

  return result.data.resultValue;
};
