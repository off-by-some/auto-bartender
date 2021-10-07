import PropTypes from 'prop-types';
import cx from 'classnames';
import "./Button.css";
import React from "react";

function Button(props) {
  const { onClick, style = {} } = props

  const handleOnClick = (...args) => {
    if (props.disabled) return;

    return onClick(...args);
  }

  return (
    <div className={cx("main button", { disabled: props.disabled })} style={style} onClick={handleOnClick}>
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