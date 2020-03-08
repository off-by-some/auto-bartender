import PropTypes from 'prop-types';
import cx from "classnames";
import React from "react";
import "./Input.css";

function Input(props) {
  return (
    <input
      className={"secondary" + props.className}
      placeholder="Tap to Search"
      {...props}
    />
  );
}

Input.defaultProps = {
  className: ""
}



export default Input;