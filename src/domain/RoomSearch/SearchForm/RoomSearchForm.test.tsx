/**
 * @jest-environment jsdom
 */

import React from "react";

import { fireEvent, render } from "@testing-library/react";

import RoomSearchForm from "./RoomSearchForm";

describe("RoomSearchForm", () => {
  const createRoomSearchForm = () => render(<RoomSearchForm />);

  it("숙소 검색 필드를 렌더링합니다", () => {
    const fields = ["위치", "체크인", "체크아웃", "인원"];

    const { queryByLabelText } = createRoomSearchForm();

    fields.forEach((field) => expect(queryByLabelText(field)).not.toBeNull());
  });

  it("위치 필드를 변경하면 change handler 함수가 실행됩니다", () => {
    const { getByLabelText, queryByDisplayValue } = createRoomSearchForm();

    fireEvent.change(getByLabelText("위치"), {
      target: {
        value: "강남구",
      },
    });

    expect(queryByDisplayValue("강남구")).not.toBeNull();
  });

  it("검색 버튼을 렌더링합니다", () => {
    const { queryByText } = createRoomSearchForm();

    expect(queryByText("검색")).not.toBeNull();
  });
});
