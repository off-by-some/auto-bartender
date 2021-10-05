import React from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/header";
import Icon from '../../components/icon';

import './AddRecipe.css';

export default class AddRecipe extends React.Component {
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
      <div id="add-recipe">
        <Header
          main="Add Recipe"
          secondary=""
          rightAction={<Icon name="close" onClick={this.onClickClose} />}
        />

      </div>
    );
  }
}

