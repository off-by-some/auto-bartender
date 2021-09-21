import React from 'react';
import Recipe from "../../api/recipes";

import Header from "../../components/header";
import SearchBar from "../../components/search-bar"
import CocktailCard from "../../components/cocktail-card"
import Grid from '../../components/grid'
import ScrollableView from '../../components/scrollable';
import Fab from '../../components/fab'
import Modal from "../../components/modal";
import PinEntry from "../../components/pin-entry";
import Progress from '../../components/progress';
import Icon from '../../components/icon'
import Recipes from '../../api/recipes'

import { Redirect } from "react-router-dom";

export default class SelectDrink extends React.Component {
  constructor(props) {
    super(props)
    this.onClickCard = this.onClickCard.bind(this);
    this.onClickFab = this.onClickFab.bind(this);
    this.onCompletePin = this.onCompletePin.bind(this);
    this.onClickSettings = this.onClickSettings.bind(this);

    this.state = {
      selected: null,
      pouring: false,
      showPin: false,
      passwordSuccessful: null,
      recipes: [],
    };
  }

  async componentDidMount() {
    const data = await Recipe.get();
    this.setState({ recipes: data });
  }

  onClickCard(e, name) {
    const selectedName = this.state.selected? this.state.selected.name : "";

    // Deselect if the user has reselected their card
    if (name === selectedName) {
      return this.setState({ selected: null })
    }

    const selected = this.state.recipes.find(x => x.name === name);

    this.setState({ selected });
  }

  async onClickFab() {
    this.setState({ pouring: true });
    const selectedRecipe = this.state.selected;
    const response = await Recipe.pour(selectedRecipe);
  }

  onClickSettings() {
    this.setState({ showPin: true });
  }

  // TODO: Actual password validation
  onCompletePin() {
    this.setState({ showPin: false, passwordSuccessful: true })
  }

  render() {
    if (this.state.passwordSuccessful) {
      return <Redirect to="/settings" />
    }

    const settingsIcon = <Icon name="settings" onClick={this.onClickSettings} />
    const selectedName = 
      this.state.selected? this.state.selected.name : "";
    
    return (
      <div>
        <Header main="Select Drink" rightAction={settingsIcon}/>
        <SearchBar />
        <ScrollableView disabled={!!this.state.selected}>
          <Grid>
            { this.state.recipes.map(x =>
              <CocktailCard
                name={x.name}
                ingredients={x.ingredients}
                onClick={this.onClickCard}
                key={x.name}
                selected={selectedName === x.name}
                disabled={selectedName != "" && selectedName != x.name}
              />)
            }
          </Grid>
        </ScrollableView>

        { this.state.selected &&
          <Fab onClick={this.onClickFab}>+</Fab>
        }

        { this.state.pouring &&
          <Modal>
            <Header main={`Pouring ${selectedName}`}/>
            <Progress percent={20} />
          </Modal>
        }

        { this.state.showPin &&
          <PinEntry fields={6} onSubmit={this.onCompletePin} />
        }
      </div>
    );
  }
}
