import PropTypes from "prop-types";
import React from "react";
import './Progress.css';

function Progress(props) {
  return (
    <div className="progress">
      <div className="bar" style={{ width: `${props.percent}%`}}></div>
    </div>
  );
}

Progress.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default Progress;