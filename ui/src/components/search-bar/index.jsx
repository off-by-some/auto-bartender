import React from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
  const letters = [
    "A", "B", "C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X",
    "Y", "Z"
  ]

  return (
  <div className="search-bar">
    { letters.map(letter => <div key={letter}>{letter}</div>)}
  </div>
  );
}