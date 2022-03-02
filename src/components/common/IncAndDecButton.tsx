import React, { useState } from "react";

interface IncAndDecButton {
  value: number;
  onChange: any;
  minValue?: number;
}

export const IncAndDecButton = ({
  value,
  onChange,
  minValue = 1,
}: IncAndDecButton) => {
  const [inputValue, setinputValue] = useState<string | number>(value);

  const onBlur = (value: string) => {
    if (Number(value) < minValue) {
      setinputValue(minValue);
      onChange(minValue);
    } else {
      onChange(Number(value));
    }
  };

  const onChangeInput = (value: string) => {
    setinputValue(value);
  };

  const onChangeIncrease = () => {
    setinputValue(Number(inputValue) + 1);
    onChange(Number(inputValue) + 1);
  };

  const onChangeDecrease = () => {
    if (Number(inputValue) === minValue) return;

    setinputValue(Number(inputValue) - 1);
    onChange(Number(inputValue) - 1);
  };

  return (
    <div className="IncAndDecButton d-flex">
      <div
        className="custom-button"
        id="decrease"
        onClick={() => onChangeDecrease()}
      >
        -
      </div>

      <input
        type="number"
        className="IncAndDecButton-input"
        value={inputValue}
        onChange={(e) => onChangeInput(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
      />

      <div
        className="custom-button"
        id="increase"
        onClick={() => onChangeIncrease()}
      >
        +
      </div>
    </div>
  );
};
