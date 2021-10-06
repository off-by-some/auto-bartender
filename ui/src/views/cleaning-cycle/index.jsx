import React from 'react';
import cx from 'classnames';
import { Redirect } from "react-router-dom";
import Fab from "../../components/fab";
import Header from "../../components/header";
import Icon from '../../components/icon';
import InfoPanel from "../../components/info-panel";
import Progress from '../../components/progress';
import Pumps from '../../api/pumps';
import PourSession from '../../api/pour-session';
import CleanSession from '../../api/clean';
import SelectableLineItem from "../../components/selectable-line-item";
import Modal from "../../components/modal";
import Button from "../../components/Button"

import './CleaningCycle.css';

export default class CleaningCycle extends React.Component {
  constructor(props) {
    super(props);

    this.onClickClose = this.onClickClose.bind(this);
    this.formatPumps = this.formatPumps.bind(this);
    this.calculateTimeToRun = this.calculateTimeToRun.bind(this);
    this.formatMinutes = this.formatMinutes.bind(this);
    this.onItemsSelected = this.onItemsSelected.bind(this);
    this.onClickFab = this.onClickFab.bind(this);
    this.pollForStatus = this.pollForStatus.bind(this);
    this.resetState = this.resetState.bind(this);

    this.initialState = {
      exitClicked: false,
      selected: [],
      pumps: [],
      completed: false,
      cleaning: false,
      progress: 0,
      completedCounter: 3,
    }
    this.state = { ...this.initialState };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.completed) { return; }
    if (prevState.completed) { return; }
   
    const countdownTimer = setInterval(() => {
      const counter = this.state.completedCounter;
      if (counter <= 1) {
        clearInterval(countdownTimer);
        this.resetState();
      }

      this.setState({ completedCounter: counter - 1 })
    }, 1000)

  }

  async componentDidMount() {
    const pumps = await Pumps.get();
    this.setState({ pumps })
  }

  resetState() {
    this.setState({ ...this.initialState, pumps: this.state.pumps });
  }

  formatMinutes(seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const minutes = (seconds % 3600) / 60

    return [ minutes, seconds % 60].map(format).join(':')
   }


  calculateTimeToRun() {
    const runTimes = this.state.selected.map(x => x.seconds_needed_to_clean);
    const runTimeSeconds = runTimes.reduce((a, b) => a + b, 0);

    return this.formatMinutes(runTimeSeconds);
  }

  async onClickFab() {
    this.setState({ cleaning: true });
    const pumpIds = this.state.selected.map(x => x.name);
    const { session_id } = await CleanSession.run(pumpIds);
    this.pollForStatus(session_id)
  }

  pollForStatus(session_id) {
    // Fake progress bar that adds one every second... should be fine right?
    const fakeProgress = setInterval(() => {
      this.setState({ progress: this.state.progress + 0.25 })
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

  formatPumps() {
    return this.state.pumps.map(pump => {
      const secondaryText = pump.ingredient ?
        `Current Ingredient: ${pump.ingredient.name}` : `No Ingredient Configured`

      return {
        main: pump.name,
        secondary: secondaryText,
        id: pump.name,
        ...pump,
      }
    });
  }


  onClickClose() {
    this.setState({ exitClicked: true });
  }

  onItemsSelected(items) {
    this.setState({ selected: items });
  }

  render() {
    if (this.state.exitClicked) {
      return <Redirect to="/" />
    }

    const items = this.formatPumps()
    const ttr = `${this.calculateTimeToRun()} minutes`;
    const modalHeader = "Cleaning..."

    return (
      <div id="cleaning-cycle">
        { !this.state.cleaning &&
          <Header
            main="Cleaning Cycle"
            secondary="Select the pumps you would like to run a cleaning cycle on"
            rightAction={<Icon name="close" onClick={this.onClickClose} />}
          />
        }

        { !this.state.cleaning && 
          <div className="panel-container">
            <div className="left-panel">
              <SelectableLineItem
                items={this.state.cleaning ? [] : items}
                onItemsSelected={this.onItemsSelected}
              />
            </div>

            <div className="right-panel">
              <InfoPanel
                main="Estimated Runtime:"
                secondary={ttr}
              />
            </div>
          </div>
        }

        { this.state.selected.length !== 0 && 
          <Fab onClick={this.onClickFab}>
            +
          </Fab>
        }

        { this.state.cleaning &&
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

      </div>
    );
  }
}

