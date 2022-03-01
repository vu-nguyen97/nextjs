import React, { useEffect } from "react";
import { ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";
import { Form } from "react-bootstrap";
import classNames from "classnames";

interface SelectProps {
  name: string;
  optionKey: string;
  optionValue: string;
  containerClass?: string;
  options: any;
  defaultOption?: string;
  defaultValue?: string;
}

function Select(props: SelectProps) {
  const {
    name,
    containerClass,
    defaultOption,
    optionKey,
    optionValue,
    options,
    defaultValue,
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

          if (e.target.value === "defaultValue") {
            formik.setFieldValue(name, "");
          }
        }}
        onBlur={() => {
          formik.setFieldTouched(name, true);
        }}
        className={classNames({
          "border-danger": formik?.touched[name] && formik?.errors[name],
        })}
        defaultValue={defaultValue}
      >
        {defaultOption && <option value="defaultValue">{defaultOption}</option>}
        {options.map((data: any) => (
          <option
            key={data[optionKey] || data.key}
            value={data[optionValue] || data.value}
          >
            {data[optionKey] || data.key}
          </option>
        ))}
      </Form.Select>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;
