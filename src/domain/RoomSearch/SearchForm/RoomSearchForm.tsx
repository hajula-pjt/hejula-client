import React from "react";

import { useRouter } from "next/router";

import styled from "@emotion/styled";

import { colorPalette } from "../../../config/color-config";

import RoomSearchField from "./RoomSearchField";
import AddressSearchResult from "./AddressSearchResult";
import Counter from "../Counter/Counter";
import CalendarContainer from "../Calendar/CalendarContainer";

import useCounter from "../Counter/hooks/useCounter";
import useSearchForm from "./hooks/useSearchForm";
import useSearchAddress from "./hooks/useSearchAddress";

import { createRoomSearchPath, getErrorMessage } from "../../../utils/path";
import { TInputCheckList } from "./type";
import { dateFormat } from "../../../utils/calendar-util";

const RoomSearchForm = ({ shadow }: { shadow: boolean }) => {
  const router = useRouter();

  const {
    fields,
    handleChange,
    handleCheckInOutChange,
    handleFocusedFieldChange,
    handleFocusedFieldToggle,
    handleClickedGu,
  } = useSearchForm();

  const {
    adult: adultCount,
    children: childrenCount,
    handlePlusClick,
    handleMinusClick,
  } = useCounter({ onChangeRoomFields: handleChange });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const checks: TInputCheckList[] = ["checkIn", "checkOut", "people"];

    if (!clickedGu) {
      alert(getErrorMessage("clickedGu"));
      return;
    }

    for (const check of checks) {
      if (!fields[check]) {
        alert(getErrorMessage(check));
        return;
      }
    }

    const path = createRoomSearchPath({
      guSeq: clickedGu?.id,
      childrenCount,
      adultCount,
      checkInDate: dateFormat({
        date: `${checkIn?.year}-${checkIn?.month}-${checkIn?.date}`,
        format: "YYYY-MM-DD",
      }),
      checkOutDate: dateFormat({
        date: `${checkOut?.year}-${checkOut?.month}-${checkOut?.date}`,
        format: "YYYY-MM-DD",
      }),
      page: 0,
      rows: 10,
    });

    handleFocusedFieldChange({ field: null });

    router.push(path);
  };

  const { gu, checkIn, checkOut, people, clickField, clickedGu } = fields;

  const { addressSearchResult } = useSearchAddress({ gu });

  const calendarVisible = clickField === "checkIn" || clickField === "checkOut";
  const peopleVisible = clickField === "people";
  const guVisible = gu && clickField === "gu";

  return (
    <>
      <SearchForm onSubmit={handleSubmit} shadow={shadow}>
        <RoomSearchField
          label="위치"
          id="gu"
          name="gu"
          value={gu || ""}
          placeholder="어디로 여행가세요?"
          onChange={handleChange}
          onFocusedFieldChange={() => handleFocusedFieldChange({ field: "gu" })}
        />
        <RoomSearchField
          label="체크인"
          id="checkIn"
          name="checkIn"
          value={checkIn ? `${checkIn?.month}월 ${checkIn?.date}일` : ""}
          placeholder="날짜 입력"
          readOnly
          onClick={() => handleFocusedFieldToggle({ field: "checkIn" })}
        />
        <RoomSearchField
          label="체크아웃"
          id="checkOut"
          name="checkOut"
          value={checkOut ? `${checkOut?.month}월 ${checkOut?.date}일` : ""}
          placeholder="날짜 입력"
          readOnly
          onClick={() => handleFocusedFieldToggle({ field: "checkOut" })}
        />
        <RoomSearchField
          label="인원"
          id="people"
          name="people"
          value={people || ""}
          placeholder="인원수 입력"
          readOnly
          onClick={() => handleFocusedFieldToggle({ field: "people" })}
        />
        {calendarVisible && (
          <CalendarContainer
            onChange={handleCheckInOutChange}
            onClickedFieldChange={handleFocusedFieldToggle}
            fields={fields}
          />
        )}
        {peopleVisible && (
          <Counter
            adultCount={adultCount}
            childrenCount={childrenCount}
            onPlusClick={handlePlusClick}
            onMinusClick={handleMinusClick}
          />
        )}
        {guVisible && (
          <AddressSearchResult
            result={addressSearchResult}
            onClick={handleChange}
            onClickedFieldChange={() =>
              handleFocusedFieldToggle({ field: "checkIn" })
            }
            onClickedGu={handleClickedGu}
          />
        )}

        <Button>
          <button type="submit">검색</button>
        </Button>
      </SearchForm>
    </>
  );
};

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 850px;
  padding: 1em 5em 1em 3em;
  border-radius: 3em;
  background: #fff;

  box-shadow: ${({ shadow }) => shadow && "0px 2px 5px rgba(0,0,0,0.1)"};
`;

const Button = styled.p`
  button {
    position: absolute;
    top: 50%;
    right: 0.7em;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${colorPalette.point};
    color: #fff;
  }
`;

export default RoomSearchForm;
