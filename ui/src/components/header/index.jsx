import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
  <div className="header">
    <h1> { props.main } </h1>
    { props.secondary != null &&
      <h2> { props.secondary } </h2>
    }
  </div>
  )
}