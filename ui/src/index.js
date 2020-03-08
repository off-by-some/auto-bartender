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
    </Switch>

  );
}

const app = (
  <Router>
    <App />
  </Router>
)

ReactDOM.render(app, document.getElementById("root"));