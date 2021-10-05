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
  const [cleaningCycleClicked, setCleaningCycleClicked] = useState(false)
  const [manageIngredientsClicked, setManageIngredientsClicked] = useState(false)
  const [manageRecipeClicked, setManageRecipeClicked] = useState(false)

  const onClickClose = () => setExitClicked(true)
  const onClickChangeIngredient = () => setChangeIngredientClicked(true)
  const onClickCleaningCycle = () => setCleaningCycleClicked(true)
  const onClickmanageIngredients = () => setManageIngredientsClicked(true)
  const onClickAddRecipe = () => setManageRecipeClicked(true)


  if (exitClicked) {
    return <Redirect to="/" />;
  } else if (changeIngredientClicked) {
    return <Redirect to="/choose-ingredient" />;
  } else if (cleaningCycleClicked) {
    return <Redirect to="/cleaning-cycle" />;
  } else if (manageIngredientsClicked) {
    return <Redirect to="/manage-ingredients" />;
  } else if (manageRecipeClicked) {
    return <Redirect to="/manage-recipes" />;
  }
  
  return (
    <div id="settings">
      <Header
        main="Settings"
        rightAction={<Icon name="close" onClick={onClickClose} />}
      />

      <ScrollableView>
        <Grid>
          <Card onClick={onClickChangeIngredient}>
            <Icon name="change" />
            <p className="secondary">Change Ingredient</p>
          </Card>

          <Card onClick={onClickCleaningCycle}>
            <Icon className="bubbles-icon" name="bubbles" />
            <p className="secondary">Cleaning Cycle</p>
          </Card>

          <Card>
            <Icon name="settings" />
            <p className="secondary">Configuration</p>
          </Card>

          <Card onClick={onClickmanageIngredients}>
            <Icon name="change" />
            <p className="secondary">Manage Ingredients</p>
          </Card>

          <Card onClick={onClickAddRecipe}>
            <Icon name="change" />
            <p className="secondary">Add Recipes</p>
          </Card>
        </Grid>
      </ScrollableView>
    </div>
  );
}