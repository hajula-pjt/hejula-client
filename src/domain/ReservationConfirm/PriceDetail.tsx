import { FC } from "react";

import styled from "@emotion/styled";

import { IPrice } from "./type";
import { getPriceSum, priceFormat } from "../../utils/price";

interface IPriceDetail {
  prices: IPrice[];
}

const PriceDetail: FC<IPriceDetail> = ({ prices }) => {
  return (
    <Wrap>
      <section>
        <Title>요금 세부 정보</Title>
        <PriceBox>
          {prices?.map(({ fullDay, price, priceSeq }) => (
            <li key={priceSeq}>
              <span>{fullDay}</span>
              <em>₩ {priceFormat({ price })}</em>
            </li>
          ))}
        </PriceBox>
        <Bottom>
          총합계 : <em>₩ {getPriceSum({ prices })}</em>
        </Bottom>
      </section>
    </Wrap>
  );
};

const Wrap = styled.article`
  padding: 20px;
  max-width: 400px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 20px;

  section + section {
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #dcdcdc;
  }
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
`;

const PriceBox = styled.ul`
  padding: 15px;
  overflow: auto;
  max-height: 150px;
  background: #eee;

  li {
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 300;
    }
  }

  li + li {
    margin-top: 10px;
  }
`;

const Bottom = styled.p`
  margin-top: 20px;
`;

export default PriceDetail;
