import { FC } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";

import { colorPalette } from "../../config/color-config";
import { getLocalStorageItem } from "../../utils/localStorage";
import { createRoomReservationConfirmPath } from "../../utils/path";
import { getPriceSum } from "../../utils/price";

import TextList from "./TextList";

import { IRoomDetail, IRouterQueryData } from "./type";
import { Button, ButtonBox } from "../../styles/button";

interface ReservationFormProps {
  detailData: IRoomDetail;
  routerQueryData: IRouterQueryData;
}

const ReservationForm: FC<ReservationFormProps> = ({
  detailData,
  routerQueryData,
}) => {
  const router = useRouter();

  const {
    checkinTime,
    checkoutTime,
    max,
    rating,
    priceList,
    accommodationSeq,
  } = detailData || {};

  const { checkInDate, checkOutDate, adultCount, childrenCount } =
    routerQueryData;

  const textList = [
    { title: "체크인", text: checkinTime },
    { title: "체크아웃", text: checkoutTime },
    { title: "인원", text: max },
  ];

  const handleClick = () => {
    const { userSeq } = getLocalStorageItem({ key: "userInfo" }) || {};

    const path = createRoomReservationConfirmPath({
      accommodationSeq,
      userSeq,
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
    });

    router.push(path);
  };

  return (
    <Wrap>
      <Top>
        <em>{priceList?.length}박</em>
        <span>
          <FaStar />
          {rating}
        </span>
      </Top>
      <TextList textList={textList} />
      <ButtonBox>
        <Button onClick={handleClick} type="button">
          예약하기
        </Button>
      </ButtonBox>
      <Bottom>
        <em>총 합계</em>
        <span>₩ {getPriceSum({ priceList })}</span>
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

export const Bottom = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #dcdcdc;
`;

export default ReservationForm;
