import { FC } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { myLoader } from "../../utils/image";

interface file {
  fileNm: string;
}
interface ImageSliderProps {
  files: file[];
}

const ImageSlider: FC<ImageSliderProps> = ({ files }) => {
  return (
    <>
      {files?.length === 0 && <p>등록된 이미지가 없습니다 🥲</p>}
      <Slider>
        {files?.map((file) => {
          const fileName = file?.fileNm;

          return (
            <ImageBox key={fileName}>
              <Image
                loader={myLoader}
                src={fileName}
                width="500"
                height="300"
                alt={fileName}
              />
            </ImageBox>
          );
        })}
      </Slider>
    </>
  );
};

export const Slider = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  background: #fff;
`;

export const ImageBox = styled.li`
  width: calc(50% - 10px);
`;

export default ImageSlider;
