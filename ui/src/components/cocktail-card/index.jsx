import React from "react";
import "./CocktailCard.css";

export default function CocktailCard(props) {
  return (
  <div className="cocktail-card">
    <img src="http://placekitten.com/400/400" />
    <div className="info-bg">
    </div>
    <div className="info">
      <p className="main">Mojito</p>
      <p className="secondary">Club soda, lime, white rum, fresh mint...</p>
    </div>
  </div>
  )
}