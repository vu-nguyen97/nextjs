import React from "react";
import { capitalizeFirstLetter } from "../../helpers/index";

function TextError(props) {
  return <div className="error">{capitalizeFirstLetter(props.children)}</div>;
}

export default TextError;
