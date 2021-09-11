import { useCallback, useState } from "react";

import {
  CheckInOut,
  ClickedGu,
  ClickField,
  RoomSearchChangeParams,
  RoomSearchFormFields,
} from "../type";

const useSearchForm = () => {
  const [fields, setFields] = useState<RoomSearchFormFields>({
    gu: null,
    checkIn: null,
    checkOut: null,
    people: 0,
    clickField: null,
    clickedGu: null,
  });

  const { clickField } = fields;

  const handleChange = useCallback(
    ({ name, value }: RoomSearchChangeParams) => {
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleFocusedFieldChange = useCallback(
    ({ field }: { field: ClickField }) => {
      handleChange({ name: "clickField", value: field });
    },
    [handleChange]
  );

  const handleFocusedFieldToggle = useCallback(
    ({ field }: { field: ClickField }) => {
      handleChange({
        name: "clickField",
        value: clickField === field ? null : field,
      });
    },
    [handleChange, clickField]
  );

  const handleCheckInOutChange = useCallback(
    ({ value }: { value: CheckInOut }) => {
      if (clickField) {
        handleChange({ name: clickField, value });
      }
    },
    [handleChange, clickField]
  );

  const handleClickedGu = useCallback(
    ({ id, name }: ClickedGu) => {
      handleChange({
        name: "clickedGu",
        value: {
          id,
          name,
        },
      });
    },
    [handleChange]
  );

  return {
    fields,
    handleChange,
    handleFocusedFieldChange,
    handleFocusedFieldToggle,
    handleCheckInOutChange,
    handleClickedGu,
  };
};

export default useSearchForm;
