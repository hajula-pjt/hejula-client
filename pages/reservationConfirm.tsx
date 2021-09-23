import { FC } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import PriceDetail from "../src/domain/ReservationConfirm/PriceDetail";

import { Container as OriginContainer } from "./style/layout";
import useRoomPrices from "../src/domain/ReservationConfirm/hooks/useRoomPrices";

const isNotZero = (text: string) => {
  return text !== "0";
};

const ReservationConfirm: FC = () => {
  const router = useRouter();

  const {
    accommodationSeq,
    adultCount,
    checkinDate,
    checkoutDate,
    childrenCount,
  } = router.query;

  const { roomPrices } = useRoomPrices({
    accommodationSeq,
    checkinDate,
    checkoutDate,
  });

  return (
    <Container>
      <PageTitle>확인 및 결제</PageTitle>
      <FlexBox>
        <article>
          <SectionTitle>예약 정보</SectionTitle>
          <Infomation>
            <dt>날짜</dt>
            <dd>
              {checkinDate} ~ {checkoutDate}
            </dd>
            <dt>인원</dt>
            <dd>
              {isNotZero(adultCount) && <span>성인 {adultCount}명</span>}
              {isNotZero(childrenCount) && (
                <span> + 어린이 {childrenCount}명</span>
              )}
            </dd>
          </Infomation>
        </article>
        <PriceDetail prices={roomPrices} />
      </FlexBox>
    </Container>
  );
};

const Container = styled(OriginContainer)`
  margin-top: 120px;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PageTitle = styled.h2`
  margin-bottom: 48px;
  font-size: 30px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 24px;
  font-size: 22px;
`;

const Infomation = styled.dl`
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

export default ReservationConfirm;
