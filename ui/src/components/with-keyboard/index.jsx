import React, { useState } from 'react';
import cx from 'classnames';
import Keyboard from 'react-simple-keyboard';
import { observer } from 'mobx-react';
import KeyboardStore from "../../stores/keyboard";

import './WithKeyboard.css';
import 'react-simple-keyboard/build/css/index.css';

function _WithKeyboard({ children }) {
    const [ shift, setShift] = useState(false);
    const [ shiftPressedLast, setShiftPressedLast] = useState(false);
  
    const keyboardCn = cx({ open: KeyboardStore.keyboardActive });
  
    const handleKeyboardDismiss = (e) => {
      if (e) {
        e.stopPropagation()
      }
      KeyboardStore.hideKeyboard();
      setShift(false);
    }
  
    const onKeyPress = (button) => {
      if (button == '{shift}' ) {
        setShiftPressedLast(true);
        return setShift(!shift);
      } else {
        setShiftPressedLast(false);
      }
  
      if (shiftPressedLast) {
        setShift(false);
      }
  
      if (button == '{lock}') {
        return setShift(!shift);
      }
  
      if (button == '{enter}') {
        return handleKeyboardDismiss();
      }
  
      KeyboardStore.broadcastKeyPress(button);
    }
  
    return (
      <>
        { children }
        <div id="keyboard-container" className={keyboardCn}>
          { KeyboardStore.keyboardActive && 
            <div className="dismiss-zone" onClick={handleKeyboardDismiss} />
          }
          <Keyboard
            layoutName={ shift? "shift": undefined }
            onKeyPress={onKeyPress}
          />
        </div>
      </>
    );
  }
  
  export const WithKeyboard = observer(_WithKeyboard);
  export default WithKeyboard;