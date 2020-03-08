import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import './LineItem.css';


function LineItemLarge(props) {
  const className = cx("line-item large", props.className);

  return (
    <div className={className} onClick={props.onClick}>
      <p className="main">{props.main}</p>
      <p className="secondary">{props.secondary}</p>
  </div>
  );
}


function LineItemSmall(props) {
  const className = cx("line-item small", props.className);

  return (
    <div className={className} onClick={props.onClick}>
      <p className="main">{props.main}</p>
    </div>
  );
}


function LineItem(props) {
  const className = cx({ "selected": props.selected });

  const onClick = (e) => props.onClick(e, props);
  const newProps = { ...props, onClick, className };

  if (props.type === "large") {
    return <LineItemLarge {...newProps} />
  } else {
    return <LineItemSmall {...newProps} />
  }
}

const commonPropTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  main: PropTypes.string.isRequired,
}

LineItemSmall.propTypes = commonPropTypes;

LineItemLarge.propTypes = {
  ...commonPropTypes,
  secondary: PropTypes.string.isRequired
}

LineItem.propTypes = {
  ...commonPropTypes,
  secondary: PropTypes.string,
  type: PropTypes.string,
  selected: PropTypes.bool,
};

LineItem.defaultProps = {
  onClick: () => null,
}

export default LineItem;