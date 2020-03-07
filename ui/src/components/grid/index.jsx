import PropTypes from 'prop-types';
import React from "react";
import "./Grid.css";

function Grid(props) {
  return (
  <div className="grid">
    { props.children }
  </div>
  )
}

Grid.propTypes = {
  children: PropTypes.node,
}

export default Grid;