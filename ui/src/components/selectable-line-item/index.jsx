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
    this.propagateItems = this.propagateItems.bind(this);

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

  propagateItems() {
    this.props.onItemsSelected(this.selectedItems());
  }

  onSelectAll() {
    if (this.allSelected()) {
      return this.setState({ selected: [] }, this.propagateItems)
    }

    this.setState(
      { selected: this.props.items.map(x => x.id ) },
      this.propagateItems
    );
  }

  onClickCheckbox(event, name) {
    const alreadySelected = this.itemIsSelected(name)

    if (alreadySelected) {
      return this.setState({
        selected: this.state.selected.filter(x => x !== name)
      }, this.propagateItems);
    }

    this.setState({
      selected: this.state.selected.concat([ name ])
    }, this.propagateItems);
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
  onItemsSelected: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    main: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }))
}

SelectableLineItem.defaultProps = {
  onItemsSelected: x => x
}