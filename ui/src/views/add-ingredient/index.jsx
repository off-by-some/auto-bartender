import React from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/header";
import Icon from '../../components/icon';
import Input from '../../components/input';

import './AddIngredient.css';

export default class AddIngredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exitClicked: false };
    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose() {
    this.setState({ exitClicked: true });
  }

  render() {
    if (this.state.exitClicked) {
      return <Redirect to="/" />
    }

    return (
      <div id="add-ingredient">
        <Header
          main="Add Ingredient"
          secondary="Type in the Ingredient Name Below"
          rightAction={<Icon name="close" onClick={this.onClickClose} />}
        />

        <Input placeHolder={"Ingredient Name..."}/>
      </div>
    );
  }
}

