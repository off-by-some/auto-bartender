import React from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/header";
import Icon from '../../components/icon';
import Input from '../../components/input';
import Ingredients from '../../api/ingredients';
import Recipes from '../../api/recipes';
import Fab from '../../components/fab'

import './AddRecipe.css';

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exitClicked: false };
    this.onClickClose = this.onClickClose.bind(this);
    this.handleChangeForRecipeName = this.handleChangeForRecipeName.bind(this);
    this.handleClickForFab = this.handleClickForFab.bind(this);

    this.state = {
      ingredients: [],
      recipes: [],
      newRecipeName: '',
      exists: false,
    }
  }

  async componentDidMount() {
    const ingredients = await Ingredients.get();
    const recipes = await Recipes.all();
    this.setState({ ingredients, recipes });
  }

  onClickClose() {
    this.setState({ exitClicked: true });
  }

  handleChangeForRecipeName(e) {
    const input = e.target;
    const recipeName = input.value;
    const existingRecipeNames = this
      .state
      .recipes
      .map(x => x.name.toLowerCase());

    const recipeAlreadyExists = 
      existingRecipeNames.includes(recipeName.toLowerCase())

    console.log(existingRecipeNames)

    if (recipeAlreadyExists) {
      return this.setState({ 
        newRecipeName: input.value,
        exists: true, 
      });
    }

    this.setState({ 
      newRecipeName: input.value,
      exists: false 
    });
  }

  async handleClickForFab() {
    this.setState({ recipeNamed: true });
  }

  render() {
    if (this.state.exitClicked) {
      return <Redirect to="/" />
    }

    const canCreate = !this.state.exists && this.state.newRecipeName.length > 0;
    const secondary = this.state.recipeNamed ?
      `Add ingredients for '${this.state.newRecipeName}'` : `Type in the Recipe Name Below`;

    return (
      <div id="add-recipe">
        <Header
          main="Add Recipe"
          secondary={secondary}
          rightAction={<Icon name="close" onClick={this.onClickClose} />}
        />
        <div className="center">
          {!this.state.recipeNamed &&
            <Input 
              onChange={this.handleChangeForRecipeName} 
              value={this.state.newRecipeName}
              placeholder={"Recipe Name..."}
            />
          }
          { this.state.exists && <p>This Recipe Already Exists!</p> }

          { canCreate &&
            <Fab onClick={this.handleClickForFab}>+</Fab>
          }
        </div>
      </div>
    );
  }
}

