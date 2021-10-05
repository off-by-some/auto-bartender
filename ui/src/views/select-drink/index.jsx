import cx from "classnames";
import React from 'react';
import Recipe from "../../api/recipes";

import Header from "../../components/header";
import SearchBar from "../../components/search-bar"
import CocktailCard from "../../components/cocktail-card"
import Grid from '../../components/grid'
import ScrollableView from '../../components/scrollable';
import Fab from '../../components/fab'
import Modal from "../../components/modal";
import Button from "../../components/Button"
import PinEntry from "../../components/pin-entry";
import Progress from '../../components/progress';
import Icon from '../../components/icon'
import PourSession from '../../api/pour-session';
import './SelectDrink.css';

import { Redirect } from "react-router-dom";

export default class SelectDrink extends React.Component {
  constructor(props) {
    super(props)
    this.onClickCard = this.onClickCard.bind(this);
    this.onClickFab = this.onClickFab.bind(this);
    this.onCompletePin = this.onCompletePin.bind(this);
    this.onClickSettings = this.onClickSettings.bind(this);
    this.resetState = this.resetState.bind(this);

    this.initialState = {
      selected: null,
      pouring: false,
      showPin: false,
      passwordSuccessful: null,
      recipes: [],
      progress: 0,
      completedCounter: 3,
      completed: false,
    };

    this.state = { ...this.initialState };
  }

  componentDidMount() {
    this.resetState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.completed) { return; }
    if (prevState.completed) { return; }
   
    const countdownTimer = setInterval(() => {
      const counter = this.state.completedCounter;
      if (counter == 0) {
        clearInterval(countdownTimer);
        this.resetState();
      }

      this.setState({ completedCounter: counter - 1 })
    }, 1000)

  }

  async resetState() {
    this.setState({
      ...this.initialState,
      recipes: await Recipe.get()
    });
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

  pollForStatus(session_id) {
    // Fake progress bar that adds one every second... should be fine right?
    const fakeProgress = setInterval(() => {
      this.setState({ progress: this.state.progress + 1 })
    }, 1000)
    
    const timeout = setInterval(async () => {
      const response = await PourSession.get(session_id);
      const { percentage_complete, errors } = response;
      if (percentage_complete > this.state.progress) {
        this.setState({ progress: percentage_complete })
      }

      if (percentage_complete >= 100) {
        console.log("cleaning up")
        clearInterval(timeout);
        clearInterval(fakeProgress);
        this.setState({ completed: true })
      }
    }, 5000)
  }

  async onClickFab() {
    this.setState({ pouring: true });
    const selectedRecipe = this.state.selected;
    const session_id = await Recipe.pour(selectedRecipe);
    this.pollForStatus(session_id)
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

    const modalHeader = this.state.completed ?
      "Enjoy!" : `Pouring ${selectedName}`
    
    return (
      <div id="select-drink">
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
            <Header main={modalHeader}/>
            <div className={cx('modal-footer', { completed: this.state.completed })}>
              <Progress percent={this.state.progress} />
              { this.state.completed &&
                  <Button>Returning in {this.state.completedCounter}...</Button>
              }
            </div>
          </Modal>
        }

        { this.state.showPin &&
          <PinEntry fields={6} onSubmit={this.onCompletePin} />
        }
      </div>
    );
  }
}
