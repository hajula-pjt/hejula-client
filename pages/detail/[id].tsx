import { useRouter } from "next/router";

import styled from "@emotion/styled";

import useRoomDetail from "../../src/domain/RoomDetail/hooks/useRoomDetail";
import TopContents from "../../src/domain/RoomDetail/TopContents";
import BodyContents from "../../src/domain/RoomDetail/BodyContents";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { detail } = useRoomDetail({ id });

  return (
    <Container>
      <TopContents detailData={detail} />
      <BodyContents detailData={detail} />
    </Container>
  );
};

export const Container = styled.main`
  margin: 0 auto;
  max-width: 1000px;
  section + section {
    margin-top: 50px;
  }
`;

export default Detail;
