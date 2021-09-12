import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import postRoomSearch from "../src/api/searchList/postRoomSearch";

import SearchResultItem from "../src/domain/RoomSearch/SearchResult/SearchResultItem";

interface File {
  fileNm: string;
}
export interface RoomItem {
  accommodationSeq: number;
  name: string;
  bathroom: number;
  bedroom: number;
  files: File[];
  rating: number;
  max: number;
}

const SearchResult = () => {
  const router = useRouter();
  const [result, setResult] = useState<RoomItem[] | []>([]);

  const { guSeq, checkInDate, checkOutDate, people } = router.query;

  const checkInOutDate = { checkInDate, checkOutDate };

  const getSearchRooms = useCallback(async () => {
    const result = await postRoomSearch({
      checkInDate,
      checkOutDate,
      guSeq,
      people,
    });

    setResult(result?.content || []);
  }, [guSeq, checkInDate, checkOutDate, people]);

  useEffect(() => {
    getSearchRooms();
  }, [getSearchRooms]);

  return (
    <Container>
      <Title>검색 결과</Title>
      {result.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <ul>
          {result.map((room) => {
            return (
              <SearchResultItem
                key={room.accommodationSeq}
                room={room}
                checkInOutDate={checkInOutDate}
              />
            );
          })}
        </ul>
      )}
    </Container>
  );
};

export const Container = styled.main`
  margin: 0 auto;
  max-width: 800px;
`;

const Title = styled.h2`
  margin: 40px 0;
  font-size: 30px;
  text-align: center;
`;

export default SearchResult;
