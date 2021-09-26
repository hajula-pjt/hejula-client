import { useRouter } from "next/router";
import Link from "next/link";

import styled from "@emotion/styled";

import { AiOutlineCheck } from "react-icons/ai";
import { IoAlertSharp } from "react-icons/io5";

import { Container } from "../../src/styles/layout";
import { colorPalette } from "../../src/config/color-config";

const isSuccess = (status) => {
  return status === "success";
};

const ReservationResult = () => {
  const router = useRouter();

  const {
    query: { status },
  } = router;

  const handleClick = () => {
    router.back();
  };

  return (
    <>
      <Container>
        <Wrap>
          <IconWrap success={isSuccess(status)}>
            {isSuccess(status) ? <AiOutlineCheck /> : <IoAlertSharp />}
          </IconWrap>
          <Title>
            {isSuccess(status)
              ? "예약이 완료 되었습니다"
              : "예약이 실패 하였습니다"}
          </Title>
          <ButtonBox>
            {isSuccess(status) ? (
              <Link href="#">
                <a>👉🏻 여행정보 목록으로 이동</a>
              </Link>
            ) : (
              <button type="button" onClick={handleClick}>
                👉🏻 이전 화면으로 돌아가기
              </button>
            )}
          </ButtonBox>
        </Wrap>
      </Container>
    </>
  );
};

interface IIconWrap {
  success: boolean;
}

const Wrap = styled.article`
  text-align: center;
`;

const IconWrap = styled.p<IIconWrap>`
  font-size: 100px;

  color: ${({ success }) =>
    success ? colorPalette.green : colorPalette.point};
`;

const Title = styled.article`
  margin-top: 20px;
  font-size: 30px; ;
`;

const ButtonBox = styled.p`
  margin-top: 20px;
  font-weight: 300;
`;

export default ReservationResult;
