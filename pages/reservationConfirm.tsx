import { useRouter } from "next/router";
import { FC } from "react";

import { Container } from "./style/layout";

const ReservationConfirm: FC = () => {
  const router = useRouter();

  return (
    <Container>
      <h2>예약 확인 및 결제 페이지</h2>
    </Container>
  );
};

export default ReservationConfirm;
