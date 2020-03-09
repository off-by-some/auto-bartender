import PropTypes from "prop-types";
import cx from "classnames";
import React from 'react';
import './Checkbox.css';

export default function Checkbox(props) {
  const className = cx("checkbox", props.className, { selected: props.selected })
  const onClick = (e) => props.onClick(e, props.name);
  return <div {...props} onClick={onClick} className={className} />
}

Checkbox.propTypes = {
  selected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Checkbox.defaultProps = {
  onClick: x => x
};

