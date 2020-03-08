import React, { useState } from 'react';
import { Redirect, useParams } from "react-router-dom";

import PropTypes from 'prop-types';
import Icon from '../../components/icon';
import LineItem from '../../components/line-item';
import ScrollableView from '../../components/scrollable';
import Header from "../../components/header";
import './ChooseIngredient.css';


export default function ChooseIngredient() {
  const params = useParams()
  const [exitClicked, setExitClicked] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")

  const secondaryMessage = params.id?
    `'${params.id}' was successfully saved 👍` : "✨🍾🍺🍶🍷🥃✨"

  const onClickClose = () => setExitClicked(true)
  const onClickItem = (e, props) => setSelectedItem(props.main)

  if (exitClicked) {
    return <Redirect to="/" />;
  }

  if (selectedItem) {
    return <Redirect to={`/choose-ingredient/${selectedItem}/replace`} />
  }

  return (
    <div id="choose-ingredient">
      <Header
        main="Select an Ingredient to Change"
        secondary={secondaryMessage}
        icon={<Icon name="close" onClick={onClickClose} />}
      />

      <ScrollableView>
        <LineItem
          main="Rum"
          secondary="4 shots per minute, 3.12ml / second"
          type="large"
          onClick={onClickItem}
        />
        <LineItem
          main="Rum"
          secondary="4 shots per minute, 3.12ml / second"
          type="large"
          onClick={onClickItem}
        />
        <LineItem
          main="Rum"
          secondary="4 shots per minute, 3.12ml / second"
          type="large"
          onClick={onClickItem}
        />
        <LineItem
          main="Rum"
          secondary="4 shots per minute, 3.12ml / second"
          type="large"
          onClick={onClickItem}
        />
        <LineItem
          main="Rum"
          secondary="4 shots per minute, 3.12ml / second"
          type="large"
          onClick={onClickItem}
        />
        <LineItem
          main="Rum"
          secondary="4 shots per minute, 3.12ml / second"
          type="large"
          onClick={onClickItem}
        />
        <LineItem
          main="Rum"
          secondary="4 shots per minute, 3.12ml / second"
          type="large"
          onClick={onClickItem}
        />
        <LineItem
          main="Rum"
          secondary="4 shots per minute, 3.12ml / second"
          type="large"
          onClick={onClickItem}
        />

      </ScrollableView>




    </div>
  );
}