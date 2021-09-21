import React from "react";
import "./Header.css";


export default function Header(props) {
  return (
  <div className="header">
    <div className="left">
      { props.leftAction }
    </div>
    <div className="right">
      { props.rightAction }
    </div>
    <h1> { props.main } </h1>
    { props.secondary != null &&
      <h2> { props.secondary } </h2>
    }
  </div>
  )
}