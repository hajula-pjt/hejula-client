import { useRouter } from "next/router";

import styled from "@emotion/styled";

import { ImCalendar } from "react-icons/im";
import { VscKey } from "react-icons/vsc";

import useRoomDetail from "../../src/domain/RoomDetail/hooks/useRoomDetail";
import TopContents from "../../src/domain/RoomDetail/TopContents";
import BodyContents from "../../src/domain/RoomDetail/BodyContents";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { detail } = useRoomDetail({ id });

  const {
    information,
    files,
    checkinTime,
    checkoutTime,
    selfCheckinWay,
    name,
    rating,
    views,
    bathroom,
    bedroom,
    max,
    admin,
  } = detail || {};

  const titleData = { name, rating, views };

  const textList = [
    {
      title: "체크인",
      text: checkinTime,
      Icon: ImCalendar,
    },
    {
      title: "체크아웃",
      text: checkoutTime,
      Icon: ImCalendar,
    },
    {
      title: "체크인 방법",
      text: selfCheckinWay,
      Icon: VscKey,
    },
  ];

  const roomData = { admin, max, bathroom, bedroom, information, textList };

  return (
    <Container>
      <TopContents titleData={titleData} files={files} />
      <BodyContents roomData={roomData} />
    </Container>
  );
};

export const Container = styled.main`
  padding-top: 200px;
  margin: 0 auto;
  max-width: 1000px;
  section + section {
    margin-top: 50px;
  }
`;

export default Detail;
