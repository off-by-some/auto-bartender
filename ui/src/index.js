import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import SearchBar from "./components/search-bar"
import CocktailCard from "./components/cocktail-card"
import Grid from './components/grid'


require('typeface-roboto')

function App(props) {
  return (
    <div>
      <Header main="Select Drink" />
      <SearchBar />
      <Grid>
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
        <CocktailCard />
      </Grid>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));