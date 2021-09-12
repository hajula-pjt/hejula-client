import axios from "axios";

export interface PostRoomSearch {
  checkInDate: string;
  checkOutDate: string;
  guSeq: string;
  page?: number;
  people: string;
  rows?: number;
  searchType?: "VIEW" | "VISITOR" | "LOWPRICE" | "HIGHPRICE";
}

const postRoomSearch = async ({
  checkInDate,
  checkOutDate,
  guSeq,
  page = 0,
  people,
  rows = 10,
  searchType = "VIEW",
}: PostRoomSearch) => {
  try {
    const {
      data: { resultValue },
    } = await axios.post("/accommodation/search", {
      checkIn: new Date(checkInDate),
      checkOut: new Date(checkOutDate),
      guSeq: Number(guSeq),
      page,
      people: Number(people),
      rows,
      searchType,
    });

    return resultValue;
  } catch (e) {
    console.error(e);
  }
};

export default postRoomSearch;
