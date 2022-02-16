import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const getStyles = (formik, name) => {
  if (formik?.touched[name] && formik?.errors[name]) {
    return { border: "1px solid #dc3545" };
  }
};

function Input(props) {
  const { label, name, formik, classNames, ...rest } = props;

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}

      <Field
        id={name}
        name={name}
        style={getStyles(formik, name)}
        className={`form-control ${classNames}`}
        {...rest}
      />

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
