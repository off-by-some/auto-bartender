import _ from "lodash";
import PropTypes from 'prop-types';
import cx from "classnames"
import React from 'react';
import "./CocktailCard.css";
import { convertUnitToShots } from "../../util";

class CocktailCard extends React.Component {
  constructor(props) {
    super(props)
    this.cardRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    const justDeselected = !this.props.selected && prevProps.selected;
    const currentlySelected = this.props.selected;

    if (currentlySelected || justDeselected) {
      this.cardRef.current.scrollIntoView()
    }
  }

  render() {
    const selectedCn = cx("cocktail-card", {
      "selected-card": this.props.selected,
      "disabled": this.props.disabled
    });

    const onClick = e => {
      if (this.props.disabled) return;
      this.props.onClick(e, this.props.name)
    }

    const shortDescription = (
      <p className="secondary">
        { this.props.ingredients.map(x => x.name).join(", ") }
      </p>
    )
    const ingredientsListing = (
      <ul className="ingredients-listing">
        { this.props.ingredients.map(x =>
          <li key={x.name} className="secondary">
            {`• ${convertUnitToShots(x.unit)} shot(s) of ${x.name}`}
          </li>
        )}
      </ul>
    );

    return (
    <div ref={this.cardRef} className={selectedCn} onClick={onClick}>
      <img src="https://picsum.photos/200/300" />

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
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    unit: PropTypes.shape({
      "amount": PropTypes.int,
      "type": PropTypes.oneOf(["ml", "oz", "cup"])
    })
  })),
}

export default CocktailCard;