import _ from 'lodash';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/header";
import cx from 'classnames';
import Icon from '../../components/icon';
import Input from '../../components/input';
import Ingredients from '../../api/ingredients';
import Recipes from '../../api/recipes';
import Fab from '../../components/fab'
import LineItem from "../../components/line-item";
import ScrollableView from "../../components/scrollable";
import IngredientLineItem from "../../components/line-item-ingredient";

import './AddRecipe.css';
import Button from '../../components/Button';

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeForIngredientLineItem = this.handleChangeForIngredientLineItem.bind(this);
    this.handleChangeForRecipeName = this.handleChangeForRecipeName.bind(this);
    this.handleClickForAddIngredient = this.handleClickForAddIngredient.bind(this);
    this.handleClickForBackground = this.handleClickForBackground.bind(this);
    this.handleClickForFab = this.handleClickForFab.bind(this);
    this.handleClickForIngredient = this.handleClickForIngredient.bind(this);
    this.handleClickForSave = this.handleClickForSave.bind(this);
    this.handleIngredientRemoval = this.handleIngredientRemoval.bind(this);
    this.ingredientsNotAdded = this.ingredientsNotAdded.bind(this);
    this.onClickClose = this.onClickClose.bind(this);

    this.state = {
      exitClicked: false,
      ingredients: [],
      addedIngredients: [],
      showIngredientDrawer: false,
      recipes: [],
      newRecipeName: '',
      exists: false,
      recipeNamed: false,
      recipeSaved: false,
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

  handleClickForFab() {
    this.setState({ recipeNamed: true });
  }

  handleClickForIngredient(e, item) {
    const foundIngredient = this.state.ingredients.find(x => x.name == item.main);
    const ingredientWithDefaults = {
      name: foundIngredient.name,
      unit: {
        type: 'shot',
        amount: 1,
      }
    }

    this.setState({
      addedIngredients: this.state.addedIngredients.concat([ingredientWithDefaults]),
      showIngredientDrawer: false,
    });
  }

  handleClickForAddIngredient(e) {
    this.setState({ showIngredientDrawer: true });
  }

  handleChangeForIngredientLineItem(ingredient, value, type) {
    const matchesIngredient = (x) => x.name === ingredient.name;
    const foundAddedIngredient = this.state.addedIngredients.find(matchesIngredient);
    const removedFound = this.state.addedIngredients.filter(x => !matchesIngredient(x));

    const modifiedIngredient = {
      name: foundAddedIngredient.name,
      unit: {
        type,
        amount: value
      }
    }

    this.setState({
      addedIngredients: removedFound.concat([modifiedIngredient]),
      showIngredientDrawer: false,
    });
  }

  ingredientsNotAdded() {
    const addedIngredientNames = this.state.addedIngredients.map(x => x.name);
    const ingredientsNotAdded = this.state.ingredients.filter((x => !addedIngredientNames.includes(x.name)));
    return ingredientsNotAdded.sort((a, b) => a.name > b.name);
  }

  handleIngredientRemoval(ingredient) {
    const addedIngredients = this.state.addedIngredients.filter(x => x.name !== ingredient.name);
    this.setState({ addedIngredients });
  }

  async handleClickForSave() {
    await Recipes.create(this.state.newRecipeName, this.state.addedIngredients);
    this.setState({ recipeSaved: true });

  }

  handleClickForBackground() {
    this.setState({ showIngredientDrawer: false });
  }

  render() {
    if (this.state.exitClicked) {
      return <Redirect to="/" />
    }

    if (this.state.recipeSaved) {
      return <Redirect to="/manage-recipes" />
    }

    const addedIngredients = _.sortBy(this.state.addedIngredients, 'name');
    const ingredientsNotAdded = this.ingredientsNotAdded()
    const ingredientDrawerCn = cx("right", { 'open': this.state.showIngredientDrawer });
    const drawerBgCn = cx("background", { 'enabled': this.state.showIngredientDrawer });
    const canCreate = !this.state.exists && this.state.newRecipeName.length > 0;
    const secondary = this.state.recipeNamed ?
      `Add ingredients for '${this.state.newRecipeName}'` : `Type in the Recipe Name Below`;

    return (
      <div id="add-recipe">
        <div onClick={this.handleClickForBackground} className={drawerBgCn}></div>

        <Header
          main="Add Recipe"
          secondary={secondary}
          rightAction={<Icon name="close" onClick={this.onClickClose} />}
        />
        {!this.state.recipeNamed &&
          <div className="center">
              <Input 
                onChange={this.handleChangeForRecipeName} 
                value={this.state.newRecipeName}
                placeholder={"Recipe Name..."}
              />
            { this.state.exists && <p>This Recipe Already Exists!</p> }
          </div>
        }

          {this.state.recipeNamed &&
            <div className="panel-container">
                <div className="left">
                  <div className="recipe-ingredients">
                    <ScrollableView height="312px">
                      { addedIngredients.map((ingredient) => 
                        <IngredientLineItem
                          key={ingredient.name}
                          ingredient={ingredient} 
                          onChange={this.handleChangeForIngredientLineItem} 
                          onDelete={this.handleIngredientRemoval}
                        />
                      )}
                    </ScrollableView>
                  </div>
                  
                  <div className="action">
                    <Button 
                      disabled={ingredientsNotAdded.length === 0}
                      onClick={this.handleClickForAddIngredient}
                    >
                      Tap Here to Add An Ingredient
                    </Button>
                    { this.state.addedIngredients.length > 0 &&
                      <Button onClick={this.handleClickForSave}>
                        Save
                      </Button>
                    }
                  </div>
                </div>
              <div className={ingredientDrawerCn}>
                <p className="secondary">Tap an ingredient</p>
                <ScrollableView height={this.state.showIngredientDrawer ? "415px": "0px"}>
                  { _.sortBy(ingredientsNotAdded, 'name').map((ingredient) => 
                    <LineItem 
                      key={ingredient.name}
                      main={ingredient.name}
                      onClick={this.handleClickForIngredient} 
                    />
                  )}
                </ScrollableView>
              </div>
          </div>
        }

        
        { !this.state.recipeNamed && canCreate &&
            <Fab onClick={this.handleClickForFab}>+</Fab>
        }
      </div>
    );
  }
}


