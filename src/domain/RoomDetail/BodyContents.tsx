import styled from "@emotion/styled";
import IconTextList from "./IconTextList";

const BodyContents = ({ roomData }) => {
  const { admin, max, bathroom, bedroom, information, textList } = roomData;
  return (
    <Contents>
      <LeftSide>
        <RoomInfo>
          <h3>호스트 {admin?.id}님이 운영하는 숙소</h3>
          <p>
            <span>최대인원 {max}명</span>
            <span>침대 {bedroom}</span>
            <span>화장실 {bathroom}</span>
          </p>
        </RoomInfo>
        <RoomIntroduce>
          <p>{information}</p>
        </RoomIntroduce>
        <IconTextList textList={textList} />
      </LeftSide>
      <RightSide>
        <ASide>사이드 메뉴</ASide>
      </RightSide>
    </Contents>
  );
};

export const Contents = styled.section`
  display: flex;
`;

export const LeftSide = styled.div`
  flex: 1;
  flex-basis: 300px;

  & > * {
    padding: 30px 0;
  }

  & > * + * {
    padding: 30px 0;
    border-top: 1px solid #dcdcdc;
  }
`;

export const RoomIntroduce = styled.div`
  p {
    line-height: 1.5;
  }
`;

export const RightSide = styled.div`
  flex-basis: 300px;
`;

export const ASide = styled.aside`
  position: sticky;
  top: 300px;
  right: 0;
  margin-left: 50px;
  background: skyblue;
`;

export const RoomInfo = styled.div`
  h3 {
    font-size: 20px;
    & + p {
      margin-top: 10px;
    }
  }

  p {
    font-size: 15px;
    span + span {
      margin-left: 5px;
      &:before {
        margin-right: 5px;
        content: "/";
      }
    }
  }
`;

export default BodyContents;
