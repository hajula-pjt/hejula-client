import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";

import { colorPalette } from "../../config/color-config";

const data = {
  labels: ["월", "화", "수", "목", "금", "토", "일"],
  datasets: [
    {
      label: "투숙객",
      data: [20, 10, 40, 45, 60, 16, 27],
      borderColor: "rgba(255, 99, 132, 0.2)",
      backgroundColor: colorPalette.point,
    },
  ],
};

const WeeklyCustomerStatistics = () => {
  return (
    <Article>
      <h3>금주 투숙객 현황</h3>
      <div>
        <Line data={data} height={80} />
      </div>
    </Article>
  );
};

const Article = styled.article`
  h3 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  div {
    padding: 20px;
    background: #fff;
  }
`;

export default WeeklyCustomerStatistics;
