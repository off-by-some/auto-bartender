import React from "react";
import PropTypes from "prop-types"
import Modal from "../modal";
import Header from '../header';
import ReactCodeInput from 'react-code-input';
import "./PinEntry.css";

class PinEntryModal extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeInput = this.onChangeInput.bind(this);
    this.createInput = this.createInput.bind(this);
    this.state = {
      resetting: false
    }
  }

  onChangeInput(pin) {
    if (pin.length !== this.props.fields) return;
    console.log("submitting", pin)
    this.props.onSubmit(pin)

    // Reset the pin input and propagate the entire password up
    this.setState({ resetting: true })
  }

  // TODO: Fix me, this is a hack to reset the state of the input
  componentDidUpdate() {
    if (this.state.resetting === true) {
      this.setState({ resetting: false });
    }
  }

  createInput() {
    if (this.state.resetting) return;

    return (
      <ReactCodeInput
        type='password'
        fields={this.props.fields}
        onChange={this.onChangeInput}
        onSubmit={this.onChangeInput}
    />
    )
  }

  render() {
    return (
      <Modal id="pin-entry">
        <Header main="Enter Password" />
        { this.createInput() }
        <p></p>
      </Modal>
    );
  }
}

PinEntryModal.propTypes = {
  fields: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default PinEntryModal