import server from "../server";

export interface PostRoomSearch {
  checkIn: string;
  checkOut: string;
  guSeq: number;
  page: number;
  people: number;
  rows: number;
}

const postRoomSearch = async ({
  checkIn,
  checkOut,
  guSeq,
  page = 0,
  people,
  rows = 10,
}: PostRoomSearch) => {
  try {
    const {
      data: { resultValue },
    } = await server.post("/accommodation/search", null, {
      params: {
        checkIn,
        checkOut,
        guSeq,
        page,
        people,
        rows,
      },
    });

    return resultValue;
  } catch (e) {
    console.error(e);
  }
};

export default postRoomSearch;
