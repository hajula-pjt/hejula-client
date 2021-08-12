/**
 * @jest-environment jsdom
 */

import React from "react";

import { fireEvent, render } from "@testing-library/react";

import RoomSearchField from "./RoomSearchField";

describe("RoomSearchForm", () => {
  const handleChange = jest.fn();

  const createRoomSearchField = ({
    value = "강남구",
    readOnly = false,
  }: {
    value: string;
    readOnly?: boolean;
  }) => {
    return render(
      <RoomSearchField
        id="location"
        label="위치"
        name="location"
        value={value}
        placeholder="어디로 여행가세요?"
        readOnly={readOnly}
        onChange={handleChange}
      />
    );
  };

  it("검색 필드를 렌더링합니다", () => {
    const { queryByLabelText, queryAllByPlaceholderText, queryByDisplayValue } =
      createRoomSearchField({ value: "강남구" });

    expect(queryByLabelText("위치")).not.toBeNull();
    expect(queryAllByPlaceholderText("어디로 여행가세요?")).not.toBeNull();
    expect(queryByDisplayValue("강남구")).not.toBeNull();
  });

  context("필드가 활성화 상태인 경우", () => {
    it("change 이벤트가 발생되면 핸들러 함수가 실행됩니다", () => {
      const { getByLabelText } = createRoomSearchField({
        value: "",
      });

      fireEvent.change(getByLabelText("위치"), {
        target: {
          value: "강남구",
        },
      });

      expect(getByLabelText("위치")).not.toHaveAttribute("readonly");

      expect(handleChange).toBeCalledWith({
        name: "location",
        value: "강남구",
      });
    });
  });

  context("필드가 비활성화 상태인 경우", () => {
    it("읽기만 가능합니다", () => {
      const { getByLabelText } = createRoomSearchField({
        value: "",
        readOnly: true,
      });

      expect(getByLabelText("위치")).toHaveAttribute("readonly");
    });
  });
});
