import PropTypes from "prop-types";
import React from "react";
import './Modal.css';

function Modal(props) {
  return (
    <div className="modal-center">
      <div className="modal">
        {props.children}
      </div>
      <div className="modal-backdrop" />
    </div>

  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;