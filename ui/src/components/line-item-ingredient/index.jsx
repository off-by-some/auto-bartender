import React, { useState } from 'react';
import Select from 'react-select'
import IncrementingInput from '../incrementing-input';
import LineItem from '../line-item';
import Icon from '../icon';

import { formatUnitToHumanReadableString } from '../../util'

import './IngredientLineItem.css'

const unitSelectOptions = [
  { value: 'shot', label: 'Shot' },
  { value: 'cup', label: 'Cup' },
  { value: 'ml', label: 'ml' },
]
  
export function IngredientLineItem({ ingredient, onChange = () => null, onDelete = () => null }) {
  const defaultOption = unitSelectOptions.find(x => x.value === 'shot');
  const [ amount, setAmount ] = useState(1);
  const [ type, setType ] = useState(defaultOption.value);
  
  const handleChangeForAmount = (value) => {
      setAmount(value);
      onChange(ingredient, value, type);
  }
  
  const handleChangeForUnit = (option) => {
      const unit = option.value; 
      setType(unit);
      onChange(ingredient, amount, unit);
  }

  const handleClickForDelete = () => {
    onDelete(ingredient);
  }

  return (
      <LineItem 
        className="ingredient-line-item"
        type="base"
      >
        <div className="title">
          <Icon name="close" onClick={handleClickForDelete} />
          <div>Add {formatUnitToHumanReadableString(amount, type)} of <b>{ ingredient.name }</b></div>

        </div>
        <div className="amount">
          <IncrementingInput onChange={handleChangeForAmount} />
          <Select defaultValue={defaultOption} options={unitSelectOptions} onChange={handleChangeForUnit} />
        </div>
      </LineItem>
  )
}
  
export default IngredientLineItem;