import { useEffect } from "react";
import { useCallback, useState } from "react";
import { ICheckInOut, TClickField } from "../../SearchForm/type";

export type CounterKeys = "adult" | "children";

const useCounter = ({
  onChangeRoomFields,
}: {
  onChangeRoomFields: ({
    name,
    value,
  }: {
    name: TClickField;
    value: string | ICheckInOut | number;
  }) => void;
}) => {
  const [counts, setCount] = useState({
    adult: 0,
    children: 0,
  });

  const { adult, children } = counts;

  const handlePlusClick = useCallback(({ key }: { key: CounterKeys }) => {
    setCount((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  }, []);

  const handleMinusClick = useCallback(
    ({ key }: { key: CounterKeys }) => {
      if (counts[key] === 0) {
        return;
      }

      setCount((prev) => ({
        ...prev,
        [key]: prev[key] - 1,
      }));
    },
    [counts]
  );

  useEffect(() => {
    onChangeRoomFields({ name: "people", value: adult + children });
  }, [adult, children, onChangeRoomFields]);

  return {
    adult,
    children,
    handlePlusClick,
    handleMinusClick,
  };
};

export default useCounter;
