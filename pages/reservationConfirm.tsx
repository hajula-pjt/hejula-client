import { FC } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import PriceDetail from "../src/domain/ReservationConfirm/PriceDetail";
import ReservationInfomation from "../src/domain/ReservationConfirm/ReservationInfomation";

import useRoomPrices from "../src/domain/ReservationConfirm/hooks/useRoomPrices";

import { Container as OriginContainer } from "../src/styles/layout";

import { getLocalStorageItem } from "../src/utils/localStorage";

import { postReservation } from "../src/api/reservation/postReservation";

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

    if (!customerSeq) {
      alert("로그인을 해주세요 😇");
    }

    try {
      await postReservation({
        accommodationSeq,
        customerSeq,
        adult: adultCount,
        children: childrenCount,
        checkinDate,
        checkoutDate,
      });

      // router.push("/reservation/success");
    } catch (e) {
      router.push("/reservation/fail");
    }
  };

  return (
    <Container>
      <PageTitle>확인 및 결제</PageTitle>
      <FlexBox>
        <ReservationInfomation
          checkinDate={checkinDate}
          checkoutDate={checkoutDate}
          adultCount={adultCount}
          childrenCount={childrenCount}
          onReservationButtonClick={handleReservationButtonClick}
        />
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

const PageTitle = styled.h2`
  margin-bottom: 48px;
  font-size: 30px;
`;

export default ReservationConfirm;
