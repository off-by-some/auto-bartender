import PropTypes from "prop-types";
import React from "react";
import './LineItem.css';

const lineItemPropTypes = {
  main: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

function LineItemLarge(props) {
  return (
    <div className="line-item large" onClick={props.onClick}>
      <p className="main">{props.main}</p>
      <p className="secondary">{props.secondary}</p>
  </div>
  );
}

function LineItemSmall(props) {
  return (
    <div className="line-item small" onClick={props.onClick}>
      <p className="main">{props.main}</p>
    </div>
  );
}

function LineItem(props) {
  const onClick = (e) => props.onClick(e, props)

  const newProps = {
    ...props,
    onClick
  }

  if (props.type === "large") {
    return <LineItemLarge {...newProps} />
  }

  return <LineItemSmall {...newProps} />
}

LineItemLarge.propTypes = lineItemPropTypes;
LineItemSmall.propTypes = lineItemPropTypes;
LineItem.propTypes = lineItemPropTypes;


export default LineItem;