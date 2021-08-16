import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import { RoomItem } from "../../../../pages/search";

import { myLoader } from "../../../utils/image";

const SearchResultItem = ({ room }: { room: RoomItem }) => {
  const { name, bathroom, bedroom, files, rating, max, accommodationSeq } =
    room;

  const fileName = files[0]?.fileNm ?? null;

  return (
    <Item key={accommodationSeq}>
      {fileName ? (
        <ImageWrap>
          <Image
            loader={myLoader}
            src={fileName}
            width="300"
            height="200"
            alt={name}
          />
        </ImageWrap>
      ) : (
        <div>이미지 없음</div>
      )}

      <ContentWrap>
        <Title>{name}</Title>
        <TextBox>
          <span>욕실 {bathroom}</span>
          <span>침실 {bedroom}</span>
          <span>최대인원 {max}</span>
        </TextBox>
        <BottomBox>평점 {rating}</BottomBox>
      </ContentWrap>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  padding: 20px 0;
  border-top: 1px solid #dcdcdc;
  cursor: pointer;
`;
const ImageWrap = styled.div`
  flex-shrink: 0;
  overflow: hidden;
  width: 300px;
  border-radius: 20px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Title = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
`;

const TextBox = styled.p`
  font-size: 14px;
  color: #666;

  span + span {
    margin-left: 10px;
  }
`;

const BottomBox = styled.p`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

export default SearchResultItem;
