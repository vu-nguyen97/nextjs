import React, { useEffect } from "react";
import { ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";
import { Form } from "react-bootstrap";
import classNames from "classnames";

export const OPTION_DEFAULT = "defaultValue";

interface SelectProps {
  name: string;
  optionLabel: string;
  optionValue: string;
  containerClass?: string;
  options: any;
  defaultOption?: string;
  defaultValue?: string;
  onChange?: any;
}

function Select(props: SelectProps) {
  const {
    name,
    containerClass,
    defaultOption,
    optionLabel,
    optionValue,
    options,
    defaultValue,
    onChange,
  } = props;
  const formik = useFormikContext<any>();

  useEffect(() => {
    if (defaultValue) {
      formik.setFieldValue(name, defaultValue);
    }
  }, []);

  return (
    <div className={containerClass}>
      <Form.Select
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);

          if (e.target.value === OPTION_DEFAULT) {
            formik.setFieldValue(name, "");
          }

          onChange && onChange(e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name, true);
        }}
        className={classNames({
          "border-danger": formik?.touched[name] && formik?.errors[name],
        })}
        defaultValue={defaultValue}
      >
        {defaultOption && (
          <option value={OPTION_DEFAULT}>{defaultOption}</option>
        )}
        {options.map((data: any) => (
          <option
            key={data[optionLabel] || data.key}
            value={data[optionValue] || data.value}
          >
            {data[optionLabel] || data.key}
          </option>
        ))}
      </Form.Select>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;
