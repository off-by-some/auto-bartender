import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import Icon from '../../components/icon';
import Search from '../../components/search';
import Header from "../../components/header";
import InfoPanel from "../../components/info-panel";
import Fab from "../../components/fab";

import './ChooseNewIngredient.css';

const ingredients = [
  { name: "Rum", key: "rum" },
  { name: "Vodka", key: "vodka" },
  { name: "Tequila", key: "tequila" },
  { name: "Jager", key: "jager" },
  { name: "Triple Sec", key: "triple sec" },
  { name: "Blue Curacao", key: "blue curacao" },
  { name: "Sour Mix", key: "sour mix" },
  { name: "Lemon Juice", key: "lemon juice" },
  { name: "Club Soda", key: "club soda" },
]

export default function ChooseNewIngredient() {
  const [exitClicked, setExitClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const onClickClose = () => setExitClicked(true);
  const onSelectItem = (item) => {
    setSelectedItem(item.name || "");
  };

  const selectedIngredient =
    selectedItem === "" ? "None Selected" : selectedItem


  if (exitClicked) {
    return <Redirect to="/" />;
  }

  return (
    <div id="choose-new-ingredient">
      <Header
        main="Select New Ingredient"
        secondary="Select an ingredient to replace 'Rum'"
        icon={<Icon name="close" onClick={onClickClose} />}
      />

      <div className="panel-container">
        <div className="left-panel">
          <Search
            height="66vh"
            items={ingredients}
            onSelectItem={onSelectItem}
          />
        </div>

        <div className="right-panel">
          <InfoPanel
            main="Current Ingredient:"
            secondary="Rum"
          />
          <InfoPanel
            main="Next Ingredient:"
            secondary={selectedIngredient}
          />
          <InfoPanel
            main="Pump Flow Rate:"
            secondary="2 shots per minute"
          />
        </div>
      </div>

      { selectedItem &&
        <Fab>
          +
        </Fab>
      }
    </div>
  );
}