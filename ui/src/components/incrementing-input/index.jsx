import React, { useState } from 'react';

import './IncrementingInput.css';

export function IncrementingInput(props) {
  const d = 0.25;
  const [ value, setValue ] = useState(1);
  const propagateValue = (newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  }

  const increment = () => propagateValue(value + d);
  const decrement = () => {
    const newValue = value - d;
    if (newValue <= 0) return;

    propagateValue(newValue);
  };

  return (
    <div className="incrementing-input">
      <button onClick={decrement}>-</button>
      <div className="value">
      { value }
      </div>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default IncrementingInput;