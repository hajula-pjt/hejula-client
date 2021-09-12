import styled from "@emotion/styled";
import { FC } from "react";

import { FaStar } from "react-icons/fa";
import { colorPalette } from "../../config/color-config";

import TextList from "./TextList";

import { IRoomDetail } from "./type";

interface ReservationFormProps {
  detailData: IRoomDetail;
}

const ReservationForm: FC<ReservationFormProps> = ({ detailData }) => {
  const { checkinTime, checkoutTime, max, rating } = detailData || {};

  const textList = [
    { title: "체크인", text: checkinTime },
    { title: "체크아웃", text: checkoutTime },
    { title: "인원", text: max },
  ];

  return (
    <Wrap>
      <Top>
        <em>N박</em>
        <span>
          <FaStar />
          {rating}
        </span>
      </Top>
      <TextList textList={textList} />
      <ButtonBox>
        <Button type="button">예약하기</Button>
      </ButtonBox>
      <Bottom>
        <em>총 합계</em>
        <span>₩[숙박비 총합]</span>
      </Bottom>
    </Wrap>
  );
};

export const Wrap = styled.div`
  position: sticky;
  top: 300px;
  right: 0;
  padding: 25px;
  margin-left: 50px;
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
`;

export const Top = styled.p`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  em {
    font-size: 20px;
  }
  span {
    display: flex;
    align-items: center;
    font-size: 14px;
    svg {
      margin-right: 5px;
      color: ${colorPalette.point};
    }
  }
`;

export const ButtonBox = styled.p`
  margin-top: 15px;
`;

export const Button = styled.button`
  padding: 15px;
  width: 100%;
  color: #fff;
  background: ${colorPalette.point};
  border-radius: 20px;
`;

export const Bottom = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #dcdcdc;
`;

export default ReservationForm;
