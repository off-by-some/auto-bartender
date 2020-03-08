import PropTypes from 'prop-types';
import cx from "classnames";
import React from "react";
import "./Scrollable.css";

function ScrollableView(props) {
  const scrollableCn = cx("scrollable", {"disabled" : props.disabled });
  const height = props.height || "344px";
  const styles = { height }

  return (
  <div className={scrollableCn} style={styles}>
    { props.children }
  </div>
  )
}

ScrollableView.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  height: PropTypes.string,
}

export default ScrollableView;