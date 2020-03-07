import PropTypes from 'prop-types';
import cx from "classnames";
import React from "react";
import "./Scrollable.css";

function ScrollableView(props) {
  const scrollableCn = cx("scrollable", {"disabled" : props.disabled });
  return (
  <div className={scrollableCn}>
    { props.children }
  </div>
  )
}

ScrollableView.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
}

export default ScrollableView;