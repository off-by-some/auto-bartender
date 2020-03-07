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
      <Route path="/settings">
        <Settings />
      </Route>

      <Route path="/choose-ingredient/:id/replace">
        <ChooseNewIngredient />
      </Route>

      <Route path="/choose-ingredient">
        <ChooseIngredient />
      </Route>

      <Route exact path="/">
        <SelectDrink />
      </Route>
    </Switch>

  );
}

const app = (
  <Router>
    <App />
  </Router>
)

ReactDOM.render(app, document.getElementById("root"));