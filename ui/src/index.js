import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SelectDrink from './views/select-drink';
import ChooseIngredient from './views/choose-ingredient';
import ChooseNewIngredient from './views/choose-new-ingredient';
import Settings from './views/settings'
import CleaningCycle from './views/cleaning-cycle';
import AddIngredient from './views/add-ingredient';
import AddRecipe from './views/add-recipe';
import ManageIngredients from './views/manage-ingredients';
import ManageRecipes from './views/manage-recipes';

require('typeface-roboto')

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={SelectDrink}
      />
      <Route
        exact
        path="/settings"
        component={Settings}
      />
      <Route
        exact
        path="/cleaning-cycle"
        component={CleaningCycle}
      />
      <Route
        exact
        path="/choose-ingredient"
        component={ChooseIngredient}
      />
      <Route
        path="/choose-ingredient/:id/success"
        component={ChooseIngredient}
      />
      <Route
        path="/choose-ingredient/:id/replace"
        component={ChooseNewIngredient}
      />
      <Route
        path="/add-ingredient"
        component={AddIngredient}
      />
      <Route
        path="/add-recipe"
        component={AddRecipe}
      />
      <Route
        path="/manage-ingredients"
        component={ManageIngredients}
      />
      <Route
        path="/manage-recipes"
        component={ManageRecipes}
      />
    </Switch>

  );
}

const app = (
  <Router>
    <App />
  </Router>
)

ReactDOM.render(app, document.getElementById("root"));