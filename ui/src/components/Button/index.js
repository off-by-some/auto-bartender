import PropTypes from 'prop-types'
import "./Button.css";
import React from "react";

function Button(props) {
  return (
    <div className="main button" onClick={props.onClick}>
      { props.children }
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

export default Button