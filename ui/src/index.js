import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Header from "./components/header";
import SearchBar from "./components/search-bar"
import CocktailCard from "./components/cocktail-card"
import ScrollableGrid from './components/grid'
import Fab from './components/fab'
import Modal from "./components/modal";
import Progress from './components/progress';

require('typeface-roboto')

const drinks = [
  {
    name: "Mojito",
    ingredients: [
      { name: "Club soda", quantity: "0.3 shots"},
      { name: "lime", quantity: "0.3 shots"},
      { name: "white rum", quantity: "0.3 shots"},
      { name: "fresh mint", quantity: "0.3 shots"},
      { name: "more", quantity: "0.3 shots"},
      { name: "stuff", quantity: "0.3 shots"},
      { name: "g", quantity: "0.3 shots"},
      { name: "p", quantity: "0.3 shots"},
      { name: "f", quantity: "0.3 shots"},
      { name: "h", quantity: "0.3 shots"},

    ]
  },
  {
    name: "AMF",
    ingredients: [
      { name: "blue curacao.", quantity: "0.3 shots"},
      { name: "sour mix", quantity: "0.3 shots"},
      { name: "gin", quantity: "0.3 shots"},
      { name: "vodka", quantity: "0.3 shots"},
      { name: "lemon", quantity: "0.3 shots"},
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
  {
    name: "The dankinator 2",
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
      <ScrollableGrid disableScrolling={!!selected}>
        { drinks.map(x =>
          <CocktailCard
            name={x.name}
            ingredients={x.ingredients}
            onClick={onClickCard}
            key={x.name}
            selected={selected === x.name}
            disabled={selected != "" && selected != x.name}
          />)

        }
      </ScrollableGrid>

      { selected &&
        <Fab>+</Fab>
      }

      <Modal>
        <Header main="Pouring Mojito..." />
        <Progress percent={20} />
      </Modal>

    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));