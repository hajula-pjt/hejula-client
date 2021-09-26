import { FC } from "react";
import styled from "@emotion/styled";

import { colorPalette } from "../../config/color-config";
import { ICustomerInfomation } from "./type/customer";

interface ICustomerReport {
  data: ICustomerInfomation[];
}

const isEmpty = (data) => data?.length === 0;

const getDay = (date) => date.split("-")[2];

const CustomerReport: FC<ICustomerReport> = ({ data }) => {
  return (
    <ReportList>
      <h3>숙박 현황</h3>
      <ListTitle as="p">
        <span>예약 숙소</span>
        <span>예약자</span>
        <span>인원</span>
        <span>숙박 일정</span>
      </ListTitle>
      {!isEmpty(data) ? (
        <List>
          {data?.map(
            (
              {
                accommodationName,
                customerNickname,
                adult,
                children,
                checkinDate,
                checkoutDate,
              },
              index
            ) => {
              const sum = adult + children;
              const stayDay = getDay(checkoutDate) - getDay(checkinDate);
              return (
                <ListItem key={`customer${index}`}>
                  <span>{accommodationName}</span>
                  <span>{customerNickname}</span>
                  <span>
                    {sum}명(어른 {adult} + 어린이 {children})
                  </span>
                  <span>
                    {checkinDate} ~ {checkoutDate}({stayDay}박 {stayDay + 1}일)
                  </span>
                </ListItem>
              );
            }
          )}
        </List>
      ) : (
        <EmptyBox>데이터가 없습니다</EmptyBox>
      )}

      <PageList>
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
      </PageList>
    </ReportList>
  );
};

const ReportList = styled.article`
  h3 {
    margin-bottom: 20px;
    font-size: 20px;
  }
`;

const List = styled.dl`
  background: #fff;
`;

const EmptyBox = styled.div`
  padding: 20px;
  color: #999;
  text-align: center;
`;

const ListItem = styled.dd`
  display: flex;
  align-items: center;
  text-align: center;

  & + & {
    border-top: 1px solid #dcdcdc;
  }

  span {
    flex: 1;
    padding: 10px;
    line-height: 1.4;
  }
`;

const ListTitle = styled(ListItem)`
  background: #fff;

  border-bottom: 1px solid rgb(220 220 220 / 40%);
`;

const PageList = styled.p`
  margin-top: 20px;
  text-align: center;

  button {
    flex: 1;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    &:hover {
      border-color: ${colorPalette.point};
      color: ${colorPalette.point};
    }
  }

  button + button {
    margin-left: 8px;
  }
`;

export default CustomerReport;
