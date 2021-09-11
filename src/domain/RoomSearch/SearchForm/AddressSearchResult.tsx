import React from "react";

import styled from "@emotion/styled";

import { guData } from "../../../api/searchForm/getAddressSearchResult";
import { ClickedGu, RoomSearchChangeParams } from "./type";

const AddressSearchResult = ({
  result,
  onClick,
  onClickedFieldChange,
  onClickedGu,
}: {
  result: guData[];
  onClick: ({ name, value }: RoomSearchChangeParams) => void;
  onClickedFieldChange: () => void;
  onClickedGu: ({ id, name }: ClickedGu) => void;
}) => {
  const handleClick = ({ id, name }: { name: string; id: number }) => {
    onClick({ name: "gu", value: name });
    onClickedFieldChange();
    onClickedGu({ id, name });
  };

  return (
    <Wrap>
      {result.map(({ guSeq, name }) => (
        <li key={guSeq} onClick={() => handleClick({ id: guSeq, name })}>
          {name}
        </li>
      ))}
    </Wrap>
  );
};

const Wrap = styled.ul`
  overflow: hidden;
  position: absolute;
  top: 110%;
  left: 0;
  max-width: 350px;
  width: 100%;
  border-radius: 20px;
  background: #fff;

  li {
    padding: 25px;
    cursor: pointer;
    &:hover {
      background: #dcdcdc;
    }
  }
`;

export default AddressSearchResult;
