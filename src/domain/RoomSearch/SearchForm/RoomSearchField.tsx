import React from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { CheckInOut, ClickField } from "./type/searchForm";

type FieldProps = {
  readOnly: boolean;
};
interface RoomSearchFieldProps {
  id: string;
  label: string;
  name: string;
  value: string | number;
  placeholder: string;
  readOnly?: boolean;
  onChange?: ({
    name,
    value,
  }: {
    name: ClickField;
    value: string | CheckInOut | number;
  }) => void;
  onClick?: () => void;
  onFocusedFieldChange?: () => void;
}

const RoomSearchField = ({
  id,
  label,
  name,
  value,
  placeholder,
  onChange,
  readOnly = false,
  onClick,
  onFocusedFieldChange,
}: RoomSearchFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (onChange) {
      onChange({ name, value });
    }
  };

  return (
    <Field readOnly={readOnly} onClick={onClick}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete="off"
        onChange={handleChange}
        onFocus={onFocusedFieldChange}
      />
    </Field>
  );
};

const Field = styled.p<FieldProps>`
  display: flex;
  flex-direction: column;
  ${({ readOnly }) =>
    readOnly &&
    css`
      cursor: pointer;
      input {
        cursor: pointer;
      }
    `};
  label {
    margin-bottom: 0.5em;
  }
  input {
    border: none;
  }
`;

export default RoomSearchField;
