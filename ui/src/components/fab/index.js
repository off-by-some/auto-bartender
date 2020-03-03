import PropTypes from 'prop-types'
import "./Fab.css";
import React from "react";

function Fab(props) {
  return (
    <div className="fab-container" onClick={props.onClick}>
      <div className="fab">
        {props.children}
      </div>
    </div>
  )
}

Fab.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Fab