import styled from "@emotion/styled";
import { FC } from "react";
import { priceFormat } from "../../utils/price";
import { IMonthlyStatistics } from "./type/Statistics";

const MonthlyStatistics: FC<IMonthlyStatistics> = ({
  visitors,
  sales,
  rateOperation,
}) => {
  return (
    <Article>
      <Section>
        <h3>이번 달 예상 총 반문자수</h3>
        <p>{visitors}</p>
      </Section>
      <Section>
        <h3>이번 달 예상 총 매출액</h3>
        <p>{priceFormat({ price: sales })}</p>
      </Section>
      <Section>
        <h3>이번 달 가동률</h3>
        <DoughnutChart percent={rateOperation}>
          <span>{rateOperation}%</span>
        </DoughnutChart>
      </Section>
    </Article>
  );
};

const Article = styled.article`
  display: flex;

  & > * {
    flex: 1;
  }

  section + section {
    margin-left: 30px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  text-align: center;

  h3 {
    margin-bottom: 20px;
    font-size: 16px;
    color: #999;
  }

  p {
    font-size: 35px;
    margin: auto;
  }
`;

const DoughnutChart = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${({ percent }) =>
    `conic-gradient(#8b22ff 0% ${percent}%, #dcdcdc ${percent}% 100%)`};

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #fff;
  }
`;

export default MonthlyStatistics;
