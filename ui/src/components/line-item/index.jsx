import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import './LineItem.css';


function LineItemLarge(props) {
  const className = cx("line-item large", props.className);

  return (
    <div className={className} onClick={props.onClick}>
      <div className="icon-spacer">{props.icon}</div>
      <div className="text">
        <p className="main">{props.main}</p>
        <p className="secondary">{props.secondary}</p>
      </div>
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

function LineItemBase(props) {
  const className = cx("line-item", props.className);

  return (
    <div className={className} onClick={props.onClick}>
      {props.children}
    </div>
  );
}


function LineItem(props) {
  const className = cx(props.className, { "selected": props.selected });

  const onClick = (e) => props.onClick(e, props);
  const newProps = { ...props, onClick, className };

  if (props.type === "large") {
    return <LineItemLarge {...newProps} />
  } else if (props.type === "base") {
    return <LineItemBase {...newProps} />
  } else {
    return <LineItemSmall {...newProps} />
  }
}

const commonPropTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  main: PropTypes.string.isRequired,
  icon: PropTypes.node,
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