import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";

const getStyles = (name) => {
  const formik = useFormikContext();

  if (formik?.touched[name] && formik?.errors[name]) {
    return { border: "1px solid #dc3545" };
  }
};

function Input(props) {
  const { label, name, formik, classNames, ...rest } = props;

  return (
    <div className={classNames}>
      {label && <label htmlFor={name}>{label}</label>}

      <Field
        id={name}
        name={name}
        style={getStyles(name)}
        className="form-control"
        {...rest}
      />

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
