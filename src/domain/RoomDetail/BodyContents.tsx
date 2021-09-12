import styled from "@emotion/styled";
import { FC } from "react";

import { getCheckInOutInfo } from "../../utils/checkInOut";

import IconTextList from "./IconTextList";

import ReservationForm from "./ReservationPreview";

import { IRoomDetail } from "./type";

interface IBodyContents {
  detailData: IRoomDetail;
}

const BodyContents: FC<IBodyContents> = ({ detailData }) => {
  const {
    admin,
    max,
    bathroom,
    bedroom,
    information,
    checkinTime,
    checkoutTime,
    selfCheckinWay,
  } = detailData || {};

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
        <IconTextList
          textList={getCheckInOutInfo({
            checkinTime,
            checkoutTime,
            selfCheckinWay,
          })}
        />
      </LeftSide>
      <RightSide>
        <ReservationForm detailData={detailData} />
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
  flex-basis: 400px;
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
