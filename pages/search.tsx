import { useRouter } from "next/router";
import { useEffect } from "react";
import postRoomSearch from "../src/api/searchForm/postRoomSearch";

const SearchResult = () => {
  const router = useRouter();
  const { guSeq, checkIn, checkOut, people } = router.query;

  useEffect(() => {
    postRoomSearch({
      guSeq,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      people,
    });
  }, [guSeq, checkIn, checkOut, people]);

  return (
    <ul>
      <li>구 번호 : {guSeq}</li>
      <li>체크인 날짜 : {checkIn}</li>
      <li>체크아웃 날짜 : {checkOut}</li>
      <li>인원수 : {people}</li>
    </ul>
  );
};

export default SearchResult;
