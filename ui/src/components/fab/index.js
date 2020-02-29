import "./Fab.css";
import React from "react";

export default function Fab(props) {
  return (
    <div className="fab-container">
      <div className="fab">
        {props.children}
      </div>
    </div>
  )
}