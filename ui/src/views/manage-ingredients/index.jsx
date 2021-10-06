import React from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/header";
import Icon from '../../components/icon';
import LineItem from "../../components/line-item";
import ScrollableView from "../../components/scrollable";
import InfoPanel from "../../components/info-panel";
import Button from "../../components/Button";
import Ingredients from '../../api/ingredients';
import Pumps from '../../api/pumps';

import './ManageIngredients.css';

export default class ManageIngredients extends React.Component {
  constructor(props) {
    super(props);

    this.onClickClose = this.onClickClose.bind(this);
    this.onClickIngredient = this.onClickIngredient.bind(this);
    this.onClickDeleteIngredient = this.onClickDeleteIngredient.bind(this);
    this.onClickCreateIngredient = this.onClickCreateIngredient.bind(this);
    this.selectedIngredientInPump = this.selectedIngredientInPump.bind(this);
    this.firstPumpWithIngredient = this.firstPumpWithIngredient.bind(this);

    this.state = { 
      exitClicked: false,
      createIngredientClicked: false,
      ingredients: [],
      pumps: [],
      selected: null,
    };
  }

  async componentDidMount() {
    const ingredients = await Ingredients.get();
    const pumps = await Pumps.get();
    this.setState({ ingredients, pumps });
  }

  onClickClose() {
    this.setState({ exitClicked: true });
  }

  onClickIngredient(event, props) {
    const ingredient = this.state.ingredients.find(x => x.name === props.main);
    const selected = this.state.selected || {};

    if (ingredient.name === selected.name ) {
      return this.setState({ selected: null })
    }

  
    this.setState({ selected: ingredient })
  }

  onClickCreateIngredient() {
    this.setState({ createIngredientClicked: true });
  }

  async onClickDeleteIngredient() {
    // We don't delete things that are actively configured in our pump
    if (this.selectedIngredientInPump()) {
      return;
    }
    
    await Ingredients.delete(this.state.selected.name);
    const ingredients = await Ingredients.get();
    this.setState({ ingredients, selected: null });
  }

  firstPumpWithIngredient() {
    const selected = this.state.selected || {};
    const pumps = this.state.pumps.filter((pump) => {
      const i = pump.ingredient || {};
      return i.name === selected.name;
    });

    return pumps[0];
  }

  selectedIngredientInPump() {
    const selected = this.state.selected || {};
    const ingredientsConfiguredInPumps = this.state.pumps.map((pump) => {
      const ingredient = pump.ingredient || {};
      return ingredient.name;
    });

    const selectedIngredientIsInPump = ingredientsConfiguredInPumps
      .filter(Boolean)
      .find(x => x === selected.name) != null;

    return selectedIngredientIsInPump;
  }

  render() {
    if (this.state.exitClicked) {
      return <Redirect to="/" />
    }

    if (this.state.createIngredientClicked) {
      return <Redirect to="/add-ingredient" />
    }

    const selectedItem = this.state.selected || {};
    const canDelete = !this.selectedIngredientInPump()
    // const pumpName = this.firstPumpWithIngredient();

    return (
      <div id="manage-ingredients">
        <Header
          main="Manage Ingredients"
          secondary="Select the ingredient you would like to manage, or create a new one."
          rightAction={<Icon name="close" onClick={this.onClickClose} />}
        />
          <div className="panel-container">
            <div className="left-panel">
              <ScrollableView>
                { this.state.ingredients.map((ingredient) => 
                  <LineItem 
                    key={ingredient.name}
                    main={ingredient.name}
                    selected={selectedItem.name === ingredient.name} 
                    onClick={this.onClickIngredient} 
                  />
                )}
              </ScrollableView>
            </div>

            <div className="right-panel">
              {this.state.selected && 
                <InfoPanel 
                  main={`${selectedItem.name || ''}`} 
                  secondary={`Used in ${selectedItem.recipe_count} ${selectedItem.recipe_count == 1 ? 'recipe' : 'recipes'}`}
                />
              }

              <div className="action">
                { !canDelete &&
                  <InfoPanel 
                    secondary={`This ingredient cannot be deleted until it is removed from ${this.firstPumpWithIngredient().name}`}
                  />
                }
                { canDelete && this.state.selected && 
                  <Button disabled={!canDelete} onClick={this.onClickDeleteIngredient} style={{"backgroundColor": "rgb(239, 79, 79)"}}>
                    Delete Ingredient
                  </Button>
                }
                { !this.state.selected && 
                  <Button onClick={this.onClickCreateIngredient}>
                    Create Ingredient
                  </Button>
                }
              </div>
            </div>
          </div>
      </div>
    );
  }
}

