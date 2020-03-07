import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import Icon from '../../components/icon';
import LineItem from '../../components/line-item';
import ScrollableView from '../../components/scrollable';
import Header from "../../components/header";
import './ChooseNewIngredient.css';


export default function ChooseNewIngredient() {
  const [exitClicked, setExitClicked] = useState(false)
  const onClickClose = () => setExitClicked(true)

  if (exitClicked) {
    return <Redirect to="/" />;
  }

  return (
    <div id="choose-new-ingredient">
      <Header
        main="Select New Ingredient"
        secondary="Choose the ingredient to replace with"
        icon={<Icon name="close" onClick={onClickClose} />}
      />

      <ScrollableView>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
        <LineItem main="Rum"/>
      </ScrollableView>
    </div>
  );
}