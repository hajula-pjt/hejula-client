import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import postRoomSearch from "../src/api/searchList/postRoomSearch";

import SearchResultItem from "../src/domain/RoomSearch/SearchResult/SearchResultItem";

import { Container } from "../src/styles/layout";

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

  const { guSeq, checkInDate, checkOutDate, adultCount, childrenCount } =
    router.query;

  const routerQueryData = {
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
  };

  const getSearchRooms = useCallback(async () => {
    const result = await postRoomSearch({
      checkInDate,
      checkOutDate,
      guSeq,
      people: Number(adultCount) + Number(childrenCount),
    });

    setResult(result?.content || []);
  }, [guSeq, checkInDate, checkOutDate, adultCount, childrenCount]);

  useEffect(() => {
    const checkList = [
      guSeq,
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
    ];

    const isNotNull = checkList?.every((item) => item ?? false);

    if (isNotNull) {
      getSearchRooms();
    }
  }, [
    guSeq,
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    getSearchRooms,
  ]);

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
                routerQueryData={routerQueryData}
              />
            );
          })}
        </ul>
      )}
    </Container>
  );
};

const Title = styled.h2`
  margin: 40px 0;
  font-size: 30px;
  text-align: center;
`;

export default SearchResult;
