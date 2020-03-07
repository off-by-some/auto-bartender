import React from 'react';
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

import { Redirect } from "react-router-dom";


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


export default class SelectDrink extends React.Component {
  constructor(props) {
    super(props)
    this.onClickCard = this.onClickCard.bind(this);
    this.onClickFab = this.onClickFab.bind(this);
    this.onCompletePin = this.onCompletePin.bind(this);
    this.onClickSettings = this.onClickSettings.bind(this);

    this.state = {
      selected: "",
      pouring: false,
      showPin: false,
      passwordSuccessful: null,
    };
  }

  onClickCard(e, name) {
    // Deselect if the user has reselected their card
    if (name === this.state.selected) {
      return this.setState({ selected: "" })
    }

    this.setState({ selected: name });
  }

  onClickFab() {
    this.setState({ pouring: true });
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

    return (
      <div>
        <Header main="Select Drink" icon={settingsIcon}/>
        <SearchBar />
        <ScrollableView disabled={!!this.state.selected}>
          <Grid>
            { drinks.map(x =>
              <CocktailCard
                name={x.name}
                ingredients={x.ingredients}
                onClick={this.onClickCard}
                key={x.name}
                selected={this.state.selected === x.name}
                disabled={this.state.selected != "" && this.state.selected != x.name}
              />)
            }
          </Grid>
        </ScrollableView>

        { this.state.selected &&
          <Fab onClick={this.onClickFab}>+</Fab>
        }

        { this.state.pouring &&
          <Modal>
            <Header main={`Pouring ${this.state.selected}`}/>
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
