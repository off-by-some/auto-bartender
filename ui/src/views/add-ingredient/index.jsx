import React from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/header";
import Icon from '../../components/icon';
import Input from '../../components/input';
import Ingredients from '../../api/ingredients';
import Fab from '../../components/fab'

import './AddIngredient.css';

export default class AddIngredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exitClicked: false };
    this.onClickClose = this.onClickClose.bind(this);
    this.handleChangeForIngredientName = this.handleChangeForIngredientName.bind(this);
    this.handleClickForFab = this.handleClickForFab.bind(this);

    this.state = {
      ingredients: [],
      newIngredientName: '',
      exists: false,
    }
  }

  async componentDidMount() {
    const ingredients = await Ingredients.get();
    this.setState({ ingredients });
  }

  onClickClose() {
    this.setState({ exitClicked: true });
  }

  handleChangeForIngredientName(e) {
    const input = e.target;
    const ingredientName = input.value;
    const existingIngredientNames = this
      .state
      .ingredients
      .map(x => x.name.toLowerCase());

    const ingredientAlreadyExists = 
      existingIngredientNames.includes(ingredientName.toLowerCase())

    if (ingredientAlreadyExists) {
      return this.setState({ 
        newIngredientName: input.value,
        exists: true, 
      });
    }

    this.setState({ 
      newIngredientName: input.value,
      exists: false 
    });
  }

  async handleClickForFab() {
    await Ingredients.create(this.state.newIngredientName);
    this.setState({ ingredientCreated: true });
  }

  render() {
    if (this.state.exitClicked) {
      return <Redirect to="/" />
    }

    if (this.state.ingredientCreated) {
      return <Redirect to="/manage-ingredients" />
    }

    const canCreate = !this.state.exists && this.state.newIngredientName.length > 0;

    return (
      <div id="add-ingredient">
        <Header
          main="Add Ingredient"
          secondary="Type in the Ingredient Name Below"
          rightAction={<Icon name="close" onClick={this.onClickClose} />}
        />
        <div className="center">
          <Input 
            onChange={this.handleChangeForIngredientName} 
            value={this.state.newIngredientName}
            placeHolder={"Ingredient Name..."}
          />
          { this.state.exists && <p>This Ingredient Already Exists!</p> }

          { canCreate &&
            <Fab onClick={this.handleClickForFab}>+</Fab>
          }
        </div>
      </div>
    );
  }
}

