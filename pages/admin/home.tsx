import { useCallback, useEffect, useState } from "react";
import Link from "next/Link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import * as api from "../../src/api/admin";
import { useLoginCookie, useLoginUserInfo } from "../../src/domain/Login/hooks";

import { IMonthlyStatistics } from "../../src/domain/admin/type/Statistics";
import { ICustomerInfomation } from "../../src/domain/admin/type/customer";

import MonthlyStatistics from "../../src/domain/admin/MonthlyStatistics";
import WeeklyCustomerStatistics from "../../src/domain/admin/WeeklyCustomerStatistics";
import CustomerReport from "../../src/domain/admin/CustomerReport";

const Home = () => {
  const { user } = useLoginUserInfo({
    storageKey: "adminUserInfo",
  });

  const { userId } = user || {};

  const [statistics, setStatistics] = useState<{
    monthly: IMonthlyStatistics | null;
    weeklyCustomer: number[] | null;
    customerList: ICustomerInfomation[] | null;
  }>({
    monthly: null,
    weeklyCustomer: null,
    customerList: null,
  });

  const { visitors, sales, rateOperation } = statistics?.monthly || {};

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

  const getCustomerReport = useCallback(async () => {
    try {
      const result = await api.getCustomerReport({ adminId: userId });

      setStatistics((prev) => ({
        ...prev,
        customerList: result,
      }));
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  useEffect(() => {
    getMonthlyStatistics();
    getWeeklyCustomerStatistics();
    getCustomerReport();
  }, [getMonthlyStatistics, getWeeklyCustomerStatistics, getCustomerReport]);

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
      <CustomerReport data={statistics?.customerList} />
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
