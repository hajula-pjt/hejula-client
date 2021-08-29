import axios from "axios";

export interface PostRoomSearch {
  checkIn: string;
  checkOut: string;
  guSeq: string;
  page?: number;
  people: string;
  rows?: number;
  searchType?: "VIEW" | "VISITOR" | "LOWPRICE" | "HIGHPRICE";
}

const postRoomSearch = async ({
  checkIn,
  checkOut,
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
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
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
