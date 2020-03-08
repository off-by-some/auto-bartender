import PropTypes from 'prop-types';
import React, { useState } from "react";
import Input from "../input";
import ScrollableView from "../scrollable";
import LineItem from "../line-item";
import Fuse from "fuse.js";

import "./Search.css";

const searchOptions = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  tokenize: true,
  distance: 20,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: [
    "name",
  ]
};

function processSearchResults(searchTerm, items) {
  const abcSort = (a, b) => a.name > b.name;

  if (searchTerm == "") {
    return items.sort(abcSort)
  }

  const fuse = new Fuse(items, searchOptions);
  return fuse.search(searchTerm)
}


function Search(props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKey, setSelectedKey] = useState("")
  const searchResults = processSearchResults(searchTerm, props.items);

  const onSearch = (e) => setSearchTerm(e.target.value);
  const onClickItem = (displayItem) => {
    const key = displayItem.key;

    if (key === selectedKey) {
      setSelectedKey("");
      props.onSelectItem("")
    } else {
      setSelectedKey(key);
      props.onSelectItem(displayItem)
    }
  }

  return (
    <div className="search-container">
      <Input
        className="secondary"
        placeholder="Tap to Search"
        onChange={onSearch}
      />

      <ScrollableView height={props.height}>
        { searchResults.map((displayItem) => {
          return (
            <LineItem
              main={displayItem.name}
              key={displayItem.key}
              onClick={onClickItem.bind(null, displayItem)}
              selected={displayItem.key === selectedKey}
            />
          )
        })}
      </ScrollableView>
    </div>
  );
}

Search.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired ,
      key: PropTypes.string.isRequired,
  })),
  height: PropTypes.string,
  onSelectItem: PropTypes.func,
}

Search.defaultProps = {
  onSelectItem: () => null,
}

export default Search;