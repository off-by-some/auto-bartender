import React from "react";
import "./Grid.css";

export default function ScrollableGrid(props) {
  return (
  <div className="scrollable-grid">
    <div className="grid">
      { props.children }
    </div>
  </div>
  )
}