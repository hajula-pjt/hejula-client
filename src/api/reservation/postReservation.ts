import axios from "axios";

export const postReservation = async ({
  accommodationSeq,
  customerSeq,
  adult,
  children,
  checkinDate,
  checkoutDate,
}: {
  accommodationSeq: string;
  customerSeq: string;
  adult: string;
  children: string;
  checkinDate: string;
  checkoutDate: string;
}) => {
  const {
    data: { completed },
  } = await axios.post(`/reservation`, {
    accommodationSeq,
    customerSeq,
    adult,
    children,
    checkinDate,
    checkoutDate,
  });

  if (!completed) {
    throw new Error("예약 실패");
  }

  return completed;
};
