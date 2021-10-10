import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";

import PropTypes from 'prop-types';
import Icon from '../../components/icon';
import LineItem from '../../components/line-item';
import ScrollableView from '../../components/scrollable';
import Header from "../../components/header";
import './ChooseIngredient.css';
import Pumps from '../../api/pumps';
import { ML_IN_SHOT, roundToHundredth } from '../../util';

function PumpLineItem(props) {
  const { pump } = props;
  const mainText = pump.ingredient ? pump.ingredient.name : pump.name
  const shotsPerMin = roundToHundredth(pump.ml_per_min / ML_IN_SHOT);
  const mlPerSec = roundToHundredth(pump.ml_per_min / 60);
  const secondaryText = `${shotsPerMin} shots per minute, ${mlPerSec}ml / second`
  const noPumpConfigured = "No ingredient configured on this pump. Tap to configure one."

  return (
    <LineItem
      main={mainText}
      secondary={pump.ingredient ? secondaryText : noPumpConfigured}
      type="large"
      selected={props.selected}
      onClick={props.onClick.bind(null, props.pump)}
    />
  );
}


export default function ChooseIngredient() {
  const params = useParams()
  const [exitClicked, setExitClicked] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")
  const [pumps, setPumps] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      if (loaded) { return; }

      const data = await Pumps.get();
      setPumps(data);
      setLoaded(true);
    })();
  })

  const secondaryMessage = params.id?
    `'${params.id}' was successfully saved 👍` : "✨🍾🍺🍶🍷🥃✨"

  const onClickClose = () => setExitClicked(true)
  const onClickItem = (pump) => setSelectedItem(pump)

  if (exitClicked) {
    return <Redirect to="/" />;
  }

  if (selectedItem) {
    return <Redirect to={`/choose-ingredient/${selectedItem.name}/replace`} />
  }

  return (
    <div id="choose-ingredient">
      <Header
        main="Select an Ingredient to Change"
        rightAction={<Icon name="close" onClick={onClickClose} />}
      />

      <ScrollableView>
        { pumps.map((pump) => 
          <PumpLineItem 
            key={pump.name}
            selected={selectedItem.name === pump.name} 
            pump={pump} 
            onClick={onClickItem} 
          />
        )}
      </ScrollableView>




    </div>
  );
}