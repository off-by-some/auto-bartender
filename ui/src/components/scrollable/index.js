import PropTypes from 'prop-types';
import cx from "classnames";
import React from "react";
import ScrollContainer from 'react-indiana-drag-scroll'

import "./Scrollable.css";

function ScrollableView(props) {
  const scrollableCn = cx("scrollable", {"disabled" : props.disabled });
  const height = props.height || "344px";
  const styles = { height }

  return (
    <ScrollContainer style={styles} className={scrollableCn}>
      { props.children }
    </ScrollContainer>
  )
}

ScrollableView.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  height: PropTypes.string,
}

export default ScrollableView;