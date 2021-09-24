import { FC } from "react";
import styled from "@emotion/styled";

import { Button, ButtonBox as OriginButtonBox } from "../../styles/button";

interface IReservationInfomation {
  checkinDate: string;
  checkoutDate: string;
  adultCount: string;
  childrenCount: string;
  onReservationButtonClick: () => void;
}

const ReservationInfomation: FC<IReservationInfomation> = ({
  checkinDate,
  checkoutDate,
  adultCount,
  childrenCount,
  onReservationButtonClick,
}) => {
  return (
    <Wrap>
      <SectionTitle>예약 정보</SectionTitle>
      <Infomation>
        <dt>날짜</dt>
        <dd>
          {checkinDate} ~ {checkoutDate}
        </dd>
        <dt>인원</dt>
        <dd>
          {isNotZero(adultCount) && <span>성인 {adultCount}명</span>}
          {isNotZero(childrenCount) && <span> + 어린이 {childrenCount}명</span>}
        </dd>
      </Infomation>
      <ButtonBox>
        <Button onClick={onReservationButtonClick} type="button">
          확인 및 결제
        </Button>
      </ButtonBox>
    </Wrap>
  );
};

const Wrap = styled.article`
  display: flex;
  flex-direction: column;
`;

const ButtonBox = styled(OriginButtonBox)`
  margin-top: auto;
`;

const SectionTitle = styled.h3`
  margin-bottom: 24px;
  font-size: 22px;
`;

const Infomation = styled.dl`
  margin-bottom: 20px;

  dt,
  dd {
    font-size: 16px;
  }
  dd {
    color: #717171;
    margin-top: 8px;
    font-weight: 300;
  }

  dd + dt {
    margin-top: 24px;
  }
`;

const isNotZero = (text: string) => {
  return text !== "0";
};

export default ReservationInfomation;
