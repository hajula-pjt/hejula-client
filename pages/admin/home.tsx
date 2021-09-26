import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import * as api from "../../src/api/admin";
import { useLoginCookie, useLoginUserInfo } from "../../src/domain/Login/hooks";
import { IMonthlyStatistics } from "../../src/domain/admin/type/Statistics";

import MonthlyStatistics from "../../src/domain/admin/MonthlyStatistics";
import WeeklyCustomerStatistics from "../../src/domain/admin/WeeklyCustomerStatistics";
import CustomerReport from "../../src/domain/admin/CustomerReport";
import { ICustomerInfomation } from "../../src/domain/admin/type/customer";
import { removeUserInfo } from "../../src/domain/Login/utils";
import { colorPalette } from "../../src/config/color-config";

const Home = () => {
  const router = useRouter();

  const { user, handleSetUser } = useLoginUserInfo({
    storageKey: "adminUserInfo",
  });
  const { removeCookie } = useLoginCookie({
    cookieKey: "AdminAuthorization",
  });
  const { userId, nickname } = user || {};

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

  console.log({ visitors, sales, rateOperation });

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

  const handleLogoutClick = () => {
    removeUserInfo({
      cookieKey: "AdminAuthorization",
      storageKey: "adminUserInfo",
      removeCookie,
      setUser: handleSetUser,
    });
    router.push("/admin/login");
  };

  return (
    <Main>
      <Header>
        <h2>대시보드</h2>
        <div>
          <em>{nickname}님</em>
          <Button onClick={handleLogoutClick} type="button">
            로그아웃
          </Button>
        </div>
      </Header>
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  h2 {
    font-size: 30px;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 20px;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  color: #999;
  &:hover {
    border-color: ${colorPalette.point};
    color: ${colorPalette.point};
  }
`;

export default Home;
