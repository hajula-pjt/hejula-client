import axios from "axios";

export interface PostRoomSearch {
  checkIn: string;
  checkOut: string;
  guSeq: number;
  page: number;
  people: number;
  rows: number;
  searchType: "VIEW" | "VISITOR" | "LOWPRICE" | "HIGHPRICE";
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
      checkIn,
      checkOut,
      guSeq,
      page,
      people,
      rows,
      searchType,
    });

    return resultValue;
  } catch (e) {
    console.error(e);
  }
};

export default postRoomSearch;
