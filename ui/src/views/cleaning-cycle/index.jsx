import React from 'react';
import { Redirect } from "react-router-dom";
import LineItem from '../../components/line-item';
import Fab from "../../components/fab";
import Header from "../../components/header";
import Icon from '../../components/icon';
import InfoPanel from "../../components/info-panel";
import ScrollableView from '../../components/scrollable';
import Checkbox from "../../components/checkbox";
import SelectableLineItem from "../../components/selectable-line-item";

import './CleaningCycle.css';

const pumps = [
  { name: "Pump 1", ingredient: "Vodka", timeToRun: 60 },
  { name: "Pump 2", ingredient: "Bourbon", timeToRun: 60 },
  { name: "Pump 3", ingredient: "Gin", timeToRun: 60 },
  { name: "Pump 4", ingredient: "Tequila", timeToRun: 60 },
  { name: "Pump 5", ingredient: "Triple Sec", timeToRun: 60 },
  { name: "Pump 6", ingredient: "Lemon Juice", timeToRun: 60 },
  { name: "Pump 8", ingredient: "Empty", timeToRun: 60 },
  { name: "Pump 9", ingredient: "Empty", timeToRun: 60 },
  { name: "Pump 10", ingredient: "Empty", timeToRun: 60 },
  { name: "Pump 11", ingredient: "Empty", timeToRun: 60 },
]

export default class CleaningCycle extends React.Component {
  constructor(props) {
    super(props);

    this.onClickClose = this.onClickClose.bind(this);
    this.formatPumps = this.formatPumps.bind(this);
    this.state = {
      exitClicked: false,
    }
  }

  formatPumps() {
    return pumps.map(pump => {
      return {
        main: pump.name,
        secondary: `Current Ingredient: ${pump.ingredient}`,
        id: pump.name,
      }
    });
  }

  onClickClose() {
    this.setState({ exitClicked: true });
  }

  render() {
    if (this.state.exitClicked) {
      return <Redirect to="/" />
    }

    const items = this.formatPumps()

    return (
      <div id="cleaning-cycle">
        <Header
          main="Cleaning Cycle"
          secondary="Select the pumps you would like to run a cleaning cycle on"
          icon={<Icon name="close" onClick={this.onClickClose} />}
        />

        <div className="panel-container">
          <div className="left-panel">
            <SelectableLineItem items={items} />
          </div>

          <div className="right-panel">
            <InfoPanel
              main="Estimated Runtime:"
              secondary="00:00 minutes"
            />
          </div>
        </div>

        <Fab onClick={x => x}>
          +
        </Fab>
      </div>
    );
  }
}

