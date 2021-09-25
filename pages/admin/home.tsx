import { useCallback, useEffect, useState } from "react";
import Link from "next/Link";
import styled from "@emotion/styled";

import * as api from "../../src/api/admin";
import MonthlyStatistics from "../../src/domain/admin/MonthlyStatistics";
import { useLoginUserInfo } from "../../src/domain/Login/hooks";
import { IMonthlyStatistics } from "../../src/domain/admin/type/Statistics";
import WeeklyCustomerStatistics from "../../src/domain/admin/WeeklyCustomerStatistics";

const Home = () => {
  const [statistics, setStatistics] = useState<{
    monthly: IMonthlyStatistics | null;
    weeklyCustomer: number[] | null;
  }>({
    monthly: null,
    weeklyCustomer: null,
  });

  const { visitors, sales, rateOperation } = statistics?.monthly || {};

  const { user } = useLoginUserInfo({ storageKey: "adminUserInfo" });
  const { userId } = user || {};

  const getMonthlyStatistics = useCallback(async () => {
    try {
      const result = await api.getMonthlyStatistics({ adminId: userId });

      setStatistics((prev) => ({
        ...prev,
        monthly: result,
      }));
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  const getWeeklyCustomerStatistics = useCallback(async () => {
    try {
      const result = await api.getWeeklyCustomerStatistics({ adminId: userId });
      //FIXME
      // 더미데이터를 실데이터로 바꾸는 작업 필요
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  useEffect(() => {
    getMonthlyStatistics();
    getWeeklyCustomerStatistics();
  }, [getMonthlyStatistics, getWeeklyCustomerStatistics]);

  if (!user) {
    return (
      <div>
        <p>로그인이 필요한 페이지입니다</p>
        <p>
          <Link href="/admin/login">
            <a>로그인하기</a>
          </Link>
        </p>
      </div>
    );
  }

  return (
    <Main>
      <Title>대시보드</Title>
      <MonthlyStatistics
        visitors={visitors}
        sales={sales}
        rateOperation={rateOperation}
      />
      <WeeklyCustomerStatistics />
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
    margin-top: 50px;
  }
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 30px;
`;

export default Home;
