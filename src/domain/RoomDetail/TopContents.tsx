import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";

import { colorPalette } from "../../config/color-config";

import ImageSlider from "./ImageSlider";

const TopContents = ({ titleData, files }) => {
  const { name, rating, views } = titleData;

  return (
    <section>
      <Head>
        <h2>{name}</h2>
        <p>
          <span>
            <FaStar />
            {rating}
          </span>
          <span>
            <GrFormView />
            {views}
          </span>
        </p>
      </Head>
      <ImageSlider files={files} />
    </section>
  );
};

export const Head = styled.div`
  margin-bottom: 20px;
  h2 {
    font-size: 25px;
  }
  p {
    margin-top: 15px;
    span {
      display: inline-flex;
      align-items: center;
      font-size: 15px;
    }
    span + span {
      margin-left: 10px;
    }
    svg {
      margin-right: 3px;
      color: ${colorPalette.point};
      vertical-align: middle;
    }
  }
`;

export default TopContents;
