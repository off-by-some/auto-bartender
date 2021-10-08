import PropTypes from 'prop-types';
import React from "react";
import "./Input.css";
import KeyboardStore from '../../stores/keyboard';

const keyMappingFn = {
  '{tab}': (value, _button) => `${value}\t`, 
  '{space}': (value, _button) => `${value} `, 
  '{bksp}': (value, _button) => value.substring(0, value.length - 1),
  default: (value, button) => `${value}${button}`
};

class Input extends React.Component {
  constructor() {
    super()

    this.handleKeyboardPress = this.handleKeyboardPress.bind(this);
    this.handleKeyboardClose = this.handleKeyboardClose.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.inputRef = React.createRef();

    this.state = {
      inputValue: '',
      keyboardClosed: true,
    }
  }

  componentWillUnmount() {
    if (this.state.keyboardClosed) return;

    // If the input was focused on and it's being disposed of; close the keyboard.
    KeyboardStore.deregister();
    KeyboardStore.hideKeyboard();
  }

  handleKeyboardPress(button) {
    const mapFn = keyMappingFn[button] ?? keyMappingFn.default
    const newValue = mapFn(this.state.inputValue, button);
    this.setState({ inputValue: newValue });
    this.props.onChange({target: {value: newValue }})
  }

  handleKeyboardClose() {
    KeyboardStore.deregister();
    this.setState({ keyboardClosed: true })
  }

  onFocus() {
    KeyboardStore.register({ 
      onKeyPress: this.handleKeyboardPress,
      onClose: this.handleKeyboardClose,
    });

    this.setState({ keyboardClosed: false });
    KeyboardStore.showKeyboard();
  }

  onBlur() {
    if (this.state.keyboardClosed) return;

    // Refocus the input from tapping the keyboard
    this.inputRef.current.focus()
  }

  render() {
    return (
      <input
        ref={this.inputRef}
        className={"secondary " + this.props.className}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={this.state.inputValue}
        placeholder={this.props.placeholder}
        {...this.props}
      />
    );
  }
}

Input.defaultProps = {
  className: "",
  onChange: () => null,
  placeholder: "Tap to Search"
}

export default React.memo(Input);