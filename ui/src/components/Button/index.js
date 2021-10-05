import PropTypes from 'prop-types';
import cx from 'classnames';
import "./Button.css";
import React from "react";

function Button(props) {
  let styles = props.style || {};

  return (
    <div className={cx("main button", { disabled: props.disabled })} style={props.style} onClick={props.onClick}>
      { props.children }
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Button