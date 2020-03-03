import PropTypes from 'prop-types';
import cx from "classnames";
import React from "react";
import "./Grid.css";

function ScrollableGrid(props) {
  const scrollableCn = cx({"disabled" : props.disableScrolling });
  return (
  <div className={`scrollable-grid ${scrollableCn}`}>
    <div className="grid">
      { props.children }
    </div>
  </div>
  )
}

ScrollableGrid.propTypes = {
  children: PropTypes.node,
  disableScrolling: PropTypes.bool,
}

export default ScrollableGrid;