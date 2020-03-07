import PropTypes from 'prop-types'
import "./Card.css";
import React from "react";

function Card(props) {
  return (
    <div className="card" onClick={props.onClick}>
      { props.children }
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

export default Card