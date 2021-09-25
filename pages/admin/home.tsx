import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import * as api from "../../src/api/admin/getMonthlyStatistics";
import MonthlyStatistics from "../../src/domain/admin/MonthlyStatistics";
import { useLoginUserInfo } from "../../src/domain/Login/hooks";
import { IMonthlyStatistics } from "../../src/domain/admin/type/Statistics";

const Home = () => {
  const [statistics, setStatistics] = useState<IMonthlyStatistics | null>(null);
  const { visitors, sales, rateOperation } = statistics || {};

  const { user } = useLoginUserInfo({ storageKey: "adminUserInfo" });
  const { userId } = user || {};

  const getMonthlyStatistics = async () => {
    try {
      const result = await api.getMonthlyStatistics({ adminId: userId });

      setStatistics(result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMonthlyStatistics();
  }, [userId]);

  return (
    <Main>
      <Title>대시보드</Title>
      <MonthlyStatistics
        visitors={visitors}
        sales={sales}
        rateOperation={rateOperation}
      />
      <article>
        <h3>금주 투숙객 현황</h3>
        <div>그래프 영역</div>
      </article>
      <article>
        <h3>숙박 현황</h3>
        <dl>
          <dt>
            <span>예약 숙소</span>
            <span>예약자</span>
            <span>인원</span>
            <span>숙박 일정</span>
          </dt>
          <dd>
            <span>A숙소</span>
            <span>영국너구리</span>
            <span>3명(어른 2 + 어린이 1)</span>
            <span>2021.06.13 ~ 2021.06.15(2박 3일)</span>
          </dd>
          <dd>
            <span>A숙소</span>
            <span>영국너구리</span>
            <span>3명(어른 2 + 어린이 1)</span>
            <span>2021.06.13 ~ 2021.06.15(2박 3일)</span>
          </dd>
          <dd>
            <span>A숙소</span>
            <span>영국너구리</span>
            <span>3명(어른 2 + 어린이 1)</span>
            <span>2021.06.13 ~ 2021.06.15(2박 3일)</span>
          </dd>
        </dl>
        <p>
          <button type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
        </p>
      </article>
    </Main>
  );
};

const Main = styled.main`
  article + article {
    margin-top: 30px;
  }
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 30px;
`;

export default Home;
