import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Header from "./components/header";
import SearchBar from "./components/search-bar"
import CocktailCard from "./components/cocktail-card"
import ScrollableGrid from './components/grid'

require('typeface-roboto')

const drinks = [
  {
    name: "Mojito",
    ingredients: [
      { name: "asdsadsadasdsadsadsadasdsadsadas", quantity: "0.3 shots"},
      { name: "b", quantity: "0.3 shots"},
      { name: "c", quantity: "0.3 shots"},
      { name: "dasdsajdjsalkdaslkdjaskldjaslkdjasklda", quantity: "0.3 shots"},
      { name: "e", quantity: "0.3 shots"},
      { name: "f", quantity: "0.3 shots"},
      { name: "g", quantity: "0.3 shots"},
    ]
  },
  {
    name: "Tom Collins",
    ingredients: [
      { name: "a", quantity: "0.3 shots"},
      { name: "b", quantity: "0.3 shots"},
      { name: "c", quantity: "0.3 shots"},
      { name: "d", quantity: "0.3 shots"},
      { name: "e", quantity: "0.3 shots"},
      { name: "f", quantity: "0.3 shots"},
      { name: "g", quantity: "0.3 shots"},
    ]
  },
  {
    name: "Jager",
    ingredients: [
      { name: "a", quantity: "0.3 shots"},
      { name: "b", quantity: "0.3 shots"},
      { name: "c", quantity: "0.3 shots"},
      { name: "d", quantity: "0.3 shots"},
      { name: "e", quantity: "0.3 shots"},
      { name: "f", quantity: "0.3 shots"},
      { name: "g", quantity: "0.3 shots"},
    ]
  },
  {
    name: "Old Fashioned",
    ingredients: [
      { name: "a", quantity: "0.3 shots"},
      { name: "b", quantity: "0.3 shots"},
      { name: "c", quantity: "0.3 shots"},
      { name: "d", quantity: "0.3 shots"},
      { name: "e", quantity: "0.3 shots"},
      { name: "f", quantity: "0.3 shots"},
      { name: "g", quantity: "0.3 shots"},
    ]
  },
  {
    name: "Jungle Juice",
    ingredients: [
      { name: "a", quantity: "0.3 shots"},
      { name: "b", quantity: "0.3 shots"},
      { name: "c", quantity: "0.3 shots"},
      { name: "d", quantity: "0.3 shots"},
      { name: "e", quantity: "0.3 shots"},
      { name: "f", quantity: "0.3 shots"},
      { name: "g", quantity: "0.3 shots"},
    ]
  },
  {
    name: "The dankinator",
    ingredients: [
      { name: "a", quantity: "0.3 shots"},
      { name: "b", quantity: "0.3 shots"},
      { name: "c", quantity: "0.3 shots"},
      { name: "d", quantity: "0.3 shots"},
      { name: "e", quantity: "0.3 shots"},
      { name: "f", quantity: "0.3 shots"},
      { name: "g", quantity: "0.3 shots"},
    ]
  },
]

function App(props) {
  const [selected, setSelected] = useState("");

  const onClickCard = (e, name) => {
    if (name === selected) return setSelected("");
    setSelected(name);
  }

  if (selected) {

  }

  return (
    <div>
      <Header main="Select Drink" />
      <SearchBar />
      <ScrollableGrid>

        { drinks.map(x =>
          <CocktailCard
            name={x.name}
            ingredients={x.ingredients}
            onClick={onClickCard}
            key={x.name}
            selected={selected === x.name}
          />)

        }
      </ScrollableGrid>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));