import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/card";
import Fab from "../../components/fab";
import Header from "../../components/header";
import Icon from '../../components/icon';
import InfoPanel from "../../components/info-panel";
import Modal from "../../components/modal";
import Search from '../../components/search';
import Pumps from '../../api/pumps';
import Ingredients from '../../api/ingredients';
import { useParams } from 'react-router';
import { ML_IN_SHOT, roundToHundredth } from '../../util';

import './ChooseNewIngredient.css';

export default function ChooseNewIngredient() {
  const params = useParams()
  const [exitClicked, setExitClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [saved, setSaved] = useState(false);
  const [selectedPump, setSelectedPump] = useState({});
  const [pumps, setPumps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      if (loaded) { return; }

      const pumps = await Pumps.get();
      const ingredients = await Ingredients.get();
      const selectedPump = pumps.find(pump => pump.name === params.id);

      setSelectedPump(selectedPump);
      setPumps(pumps);
      setIngredients(ingredients);
      setLoaded(true);

    })();
  })

  const ingredientsInPumps = pumps.map(x => x.ingredient?.name).filter(Boolean);
  const shapedIngredients = ingredients.map(x => {
    x.key = x.name;
    return x;
  })

  const searchableIngredients = shapedIngredients.filter(
    (x) => !ingredientsInPumps.includes(x.name)
  )

  const onClickModalBackground = (e) => setShowModal(false)
  const onClickConfirmFab = () => setShowModal(true)
  const onClickSave = async () => {
    await Pumps.updateIngredient(selectedPump.name, selectedItem);
    setSaved(true)
   }


  const onClickClose = () => setExitClicked(true);
  const onSelectItem = (item) => {
    setSelectedItem(item.name || "");
  };

  const selectedIngredient =
    selectedItem === "" ? "None Selected" : selectedItem

  if (saved) {
    return <Redirect to={`/choose-ingredient/${selectedItem}/success`} />
  }

  if (exitClicked) {
    return <Redirect to="/" />;
  }

  const secondaryHeaderText = (selectedPump.ingredient ? 
    `Select an ingredient to replace '${selectedPump.ingredient.name}'` :
    `Select an ingredient for ${selectedPump.name}`
  );

  const flowRate = (selectedPump.ml_per_min === undefined ?
    "" :
    `${roundToHundredth(selectedPump.ml_per_min / ML_IN_SHOT)} shots per minute`
  );

  return (
    <div id="choose-new-ingredient">
      <Header
        main="Select New Ingredient"
        secondary={secondaryHeaderText}
        rightAction={<Icon name="close" onClick={onClickClose} />}
      />

      <div className="panel-container">
        <div className="left-panel">
          <Search
            height="66vh"
            items={searchableIngredients}
            onSelectItem={onSelectItem}
          />
        </div>

        <div className="right-panel">
          <InfoPanel
            main="Next Ingredient:"
            secondary={selectedIngredient}
          />
          <InfoPanel
            main="Pump Flow Rate:"
            secondary={flowRate}
          />
        </div>
      </div>

      { selectedItem &&
        <Fab onClick={onClickConfirmFab}>
          +
        </Fab>
      }

      { showModal &&
        <Modal
          id="insert-pump"
          onClickBackground={onClickModalBackground}
        >
          <Header
            main={`Please insert pump #2 into the container of '${selectedIngredient}' and press 'Save'`}
          />

          <Card>
            <Icon name="bottle" />
            <Icon name="pump-line" />
          </Card>

          <Button onClick={onClickSave}>
            <p>Save</p>
          </Button>
      </Modal>
      }

    </div>
  );
}