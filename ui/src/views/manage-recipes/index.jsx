import React from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/header";
import Icon from '../../components/icon';
import LineItem from "../../components/line-item";
import ScrollableView from "../../components/scrollable";
import InfoPanel from "../../components/info-panel";
import Button from "../../components/Button";
import Recipes from '../../api/recipes';
import { convertUnitToShots } from "../../util";


import './ManageRecipes.css';

export default class ManageRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.onClickClose = this.onClickClose.bind(this);
    this.onClickRecipe = this.onClickRecipe.bind(this);
    this.onClickDeleteRecipe = this.onClickDeleteRecipe.bind(this);
    this.onClickCreateRecipe = this.onClickCreateRecipe.bind(this);

    this.state = { 
      exitClicked: false,
      createRecipeClicked: false,
      recipes: [],
      pumps: [],
      selected: null,
    };
  }

  async componentDidMount() {
    const recipes = await Recipes.all();
    this.setState({ recipes });
  }

  onClickClose() {
    this.setState({ exitClicked: true });
  }

  onClickRecipe(event, props) {
    const ingredient = this.state.recipes.find(x => x.name === props.main);
    const selected = this.state.selected || {};

    if (ingredient.name === selected.name ) {
      return this.setState({ selected: null })
    }

  
    this.setState({ selected: ingredient })
  }

  onClickCreateRecipe() {
    this.setState({ createRecipeClicked: true });
  }

  async onClickDeleteRecipe() {
    await Recipes.delete(this.state.selected.name);
    const recipes = await Recipes.all();
    this.setState({ recipes, selected: null });
  }

  render() {
    if (this.state.exitClicked) {
      return <Redirect to="/" />
    }

    if (this.state.createRecipeClicked) {
      return <Redirect to="/add-recipe" />
    }

    const selectedItem = this.state.selected || {};

    return (
      <div id="manage-recipes">
        <Header
          main="Manage Recipes"
          secondary="Select the recipe you would like to manage, or create a new one."
          rightAction={<Icon name="close" onClick={this.onClickClose} />}
        />
          <div className="panel-container">
            <div className="left-panel">
              <ScrollableView>
                { this.state.recipes.map((recipe) => 
                  <LineItem 
                    key={recipe.name}
                    main={recipe.name}
                    selected={selectedItem.name === recipe.name} 
                    onClick={this.onClickRecipe} 
                  />
                )}
              </ScrollableView>
            </div>

            <div className="right-panel">
              { this.state.selected && 
                <InfoPanel 
                  main={`${selectedItem.name ?? ''}`} 
                />
              }
              <div className="ingredients-list">
                <ScrollableView height="210px">
                  { this.state.selected && this.state.selected.ingredients.map((ingredient) => {
                    return <li key={ingredient.name}>{convertUnitToShots(ingredient.unit)} shot(s) of {ingredient.name}</li>
                  })}
                </ScrollableView>
              </div>

              <div className="action">
                { this.state.selected && 
                  <Button onClick={this.onClickDeleteRecipe} style={{"backgroundColor": "rgb(239, 79, 79)"}}>
                    Delete Recipe
                  </Button>
                }
                { !this.state.selected && 
                  <Button onClick={this.onClickCreateRecipe}>
                    Create Recipe
                  </Button>
                }
              </div>
            </div>
          </div>
      </div>
    );
  }
}

