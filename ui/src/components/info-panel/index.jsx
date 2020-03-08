import PropTypes from 'prop-types';
import React from "react";
import "./InfoPanel.css";

function InfoPanel(props) {
  return (
    <div className="information-panel">
      <p className="main">
        { props.main }
      </p>
      <p className="secondary">
        { props.secondary }
      </p>
    </div>
  );
}

InfoPanel.propTypes = {
  main: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
}


export default InfoPanel;