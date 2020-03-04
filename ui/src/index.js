import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SelectDrink from './views/select-drink';
import Settings from './views/settings'

require('typeface-roboto')

function App() {
  return (
    <Switch>
      <Route path="/settings">
        <Settings />
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