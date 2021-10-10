import React from "react";
import PropTypes from "prop-types"
import Modal from "../modal";
import Header from '../header';
import ReactCodeInput from 'react-code-input';
import Input from '../input'
import "./PinEntry.css";

const PASSWORD = "sanabab";

function PinEntryModal(props) {
  const [ inputValue, setInputValue ] = React.useState('');

  const handleChangeForInput = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === PASSWORD) {
      props.onSubmit()
    }
  };

  return (
    <Modal id="pin-entry" onClickBackground={props.onClose}>
      <Header main="Enter Password" />
      <Input type="password" value={inputValue} onChange={handleChangeForInput} placeholder=""/>
    </Modal>
  )
}

PinEntryModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default PinEntryModal