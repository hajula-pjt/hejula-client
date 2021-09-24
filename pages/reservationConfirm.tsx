import { FC } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import PriceDetail from "../src/domain/ReservationConfirm/PriceDetail";

import useRoomPrices from "../src/domain/ReservationConfirm/hooks/useRoomPrices";

import { Container as OriginContainer } from "../src/styles/layout";
import { Button, ButtonBox as OriginButtonBox } from "../src/styles/button";
import { postReservation } from "../src/api/reservation/postReservation";
import { getLocalStorageItem } from "../src/utils/localStorage";

const isNotZero = (text: string) => {
  return text !== "0";
};

const ReservationConfirm: FC = () => {
  const router = useRouter();

  const {
    accommodationSeq,
    adultCount,
    childrenCount,
    checkinDate,
    checkoutDate,
  } = router.query;

  const { roomPrices } = useRoomPrices({
    accommodationSeq,
    checkinDate,
    checkoutDate,
  });

  const handleReservationButtonClick = async () => {
    const { userSeq: customerSeq } =
      getLocalStorageItem({ key: "userInfo" }) || {};

    try {
      await postReservation({
        accommodationSeq,
        customerSeq,
        adult: adultCount,
        children: childrenCount,
        checkinDate,
        checkoutDate,
      });

      router.push("/reservation/success");
    } catch (e) {
      router.push("/reservation/fail");
    }
  };

  return (
    <Container>
      <PageTitle>확인 및 결제</PageTitle>
      <FlexBox>
        <ReservationConfirmWrap>
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
          <ButtonBox>
            <Button onClick={handleReservationButtonClick} type="button">
              확인 및 결제
            </Button>
          </ButtonBox>
        </ReservationConfirmWrap>
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
  align-items: flex-start;
`;

const ReservationConfirmWrap = styled.article`
  display: flex;
  flex-direction: column;
`;

const ButtonBox = styled(OriginButtonBox)`
  margin-top: auto;
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

export default ReservationConfirm;
