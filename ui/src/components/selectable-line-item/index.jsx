import React from 'react';
import PropTypes from "prop-types";
import LineItem from '../line-item';
import ScrollableView from '../scrollable';
import Checkbox from "../checkbox";

import './SelectableLineItem.css';

export default class SelectableLineItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.itemIsSelected = this.itemIsSelected.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.allSelected = this.allSelected.bind(this);
    this.timeEstimate = this.timeEstimate.bind(this);

    this.state = { selected: [] }
  }

  itemIsSelected(id) {
    return this.state.selected.indexOf(id) !== -1;
  }

  allSelected() {
    return this.state.selected.length === this.props.items.length
  }

  selectedItems() {
    const itemMap = this.props.items.reduce((a, b) => ({ ...a, [b.id]: b }), {})

    // Return the original objects of the selected items
    return this.state.selected.map((id) => {
      return itemMap[id];
    });
  }

  timeEstimate() {
    const pumpMap = this.props.items.reduce((a, b) => ({ ...a, [b.id]: b }), {})

    const selectedItems = this.state.selected.map((name) => {
      return pumpMap[name];
    })
  }

  onSelectAll() {
    if (this.allSelected()) {
      return this.setState({ selected: [] })
    }

    this.setState({ selected: this.props.items.map(x => x.id ) });
  }

  onClickCheckbox(event, name) {
    const alreadySelected = this.itemIsSelected(name)

    if (alreadySelected) {
      console.log("removing  " + name)

      return this.setState({
        selected: this.state.selected.filter(x => x !== name)
      });
    }

    console.log("adding " + name)

    this.setState({
      selected: this.state.selected.concat([ name ])
    });
  }


  render() {
    return (
      <div className="line-item-table">
        <div className="header">
          <LineItem
            main=""
            secondary=""
            type="large"
            icon={
              <Checkbox
                name="all"
                selected={this.allSelected()}
                onClick={this.onSelectAll}
              />
            }
          />
        </div>

        <ScrollableView height="318px">
          { this.props.items.map(item => (
              <LineItem
                main={item.main}
                secondary={item.secondary}
                type="large"
                key={item.id}
                onClick={this.onClickCheckbox.bind(null, null, item.id)}
                icon={
                  <Checkbox
                    name={item.id}
                    onClick={this.onClickCheckbox}
                    selected={this.itemIsSelected(item.id)}
                  />
                }
              />
            ))
        }
        </ScrollableView>
      </div>
    );
  }
}

SelectableLineItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    main: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }))
}