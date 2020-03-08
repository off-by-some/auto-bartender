import PropTypes from "prop-types";
import React from "react";
import './Modal.css';

function Modal(props) {
  return (
    <div id={props.id} className="modal-center">
      <div className="modal">
        {props.children}
      </div>
      <div className="modal-backdrop" onClick={props.onClickBackground}/>
    </div>

  );
}

Modal.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  onClickBackground: PropTypes.func,
};

Modal.defaultProps = {
  onClickBackground: x => x
}

export default Modal;