import { useRouter } from "next/router";

import styled from "@emotion/styled";

import useRoomDetail from "../../src/domain/RoomDetail/hooks/useRoomDetail";
import TopContents from "../../src/domain/RoomDetail/TopContents";
import BodyContents from "../../src/domain/RoomDetail/BodyContents";
import { Container as OriginContainer } from "../style/layout";

const Detail = () => {
  const router = useRouter();
  const { id, checkInDate, checkOutDate, adultCount, childrenCount } =
    router.query;
  const routerQueryData = {
    id,
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
  };

  const { detail } = useRoomDetail({ id, checkInDate, checkOutDate });

  return (
    <Container>
      <TopContents detailData={detail} />
      <BodyContents detailData={detail} routerQueryData={routerQueryData} />
    </Container>
  );
};

const Container = styled(OriginContainer)`
  max-width: 1000px;
  section + section {
    margin-top: 50px;
  }
`;

export default Detail;
