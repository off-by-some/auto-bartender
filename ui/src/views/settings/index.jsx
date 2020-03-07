import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import Icon from '../../components/icon';
import Grid from '../../components/grid';
import ScrollableView from '../../components/scrollable';
import Card from '../../components/card';
import Header from "../../components/header";
import './Settings.css';



export default function SettingsPage() {
  const [exitClicked, setExitClicked] = useState(false)
  const [changeIngredientClicked, setChangeIngredientClicked] = useState(false)

  const onClickClose = () => setExitClicked(true)
  const onClickChangeIngredient = () => setChangeIngredientClicked(true)

  if (exitClicked) {
    return <Redirect to="/" />;
  } else if (changeIngredientClicked) {
    return <Redirect to="/choose-ingredient" />;
  }

  return (
    <div id="settings">
      <Header
        main="Settings"
        icon={<Icon name="close" onClick={onClickClose} />}
      />

      <ScrollableView>
        <Grid>
          <Card onClick={onClickChangeIngredient}>
            <Icon name="change" />
            <p className="secondary">Change Ingredient</p>
          </Card>

          <Card>
            <Icon className="bubbles-icon" name="bubbles" />
            <p className="secondary">Cleaning Cycle</p>
          </Card>

          <Card>
            <Icon name="settings" />
            <p className="secondary">Configuration</p>
          </Card>
        </Grid>
      </ScrollableView>
    </div>
  );
}