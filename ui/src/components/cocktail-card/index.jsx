import PropTypes from 'prop-types';
import React from 'react';
import "./CocktailCard.css";

class CocktailCard extends React.Component {
  constructor(props) {
    super(props)
    this.cardRef = React.createRef()
  }

  componentDidUpdate() {
    if (!this.props.selected) return;
    this.cardRef.current.scrollIntoView(
      // {
      // behavior: "smooth",
      // block: "start",
      // inline: "nearest"}
    )
    console.log(this.cardRef.current)
  }

  render() {
    const selectedCn = this.props.selected ? "selected-card" : ""
    const onClick = e => this.props.onClick(e, this.props.name)
    const shortDescription = (
      <p className="secondary">
        { this.props.ingredients.map(x => x.name).join(", ") }
      </p>
    )
    const ingredientsListing = (
      <ul className="ingredients-listing">
        { this.props.ingredients.map(x =>
          <li key={x.name} className="secondary">
            {`• ${x.quantity} of ${x.name}`}
          </li>
        )}
      </ul>
    );

    return (
    <div ref={this.cardRef} className={`cocktail-card ${selectedCn}`} onClick={onClick}>
      <img src="http://placekitten.com/400/400" />

      { !this.props.selected &&
          <div className="info-bg">
          </div>
      }

      <div className="info">
        <p className="main">{this.props.name}</p>
        { this.props.selected ? ingredientsListing : shortDescription }
      </div>
    </div>
    );
  }
}

CocktailCard.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.string
  })),
}

export default CocktailCard;