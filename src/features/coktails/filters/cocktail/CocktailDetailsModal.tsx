import React from 'react';
interface CocktailDetailsModalProps {
  cocktail: {
    strDrink: string;
    strDrinkThumb: string;
    strCategory: string;
    strInstructions: string;
    ingredients: string[];
  };
  onClose: () => void;
}

const CocktailDetailsModal: React.FC<CocktailDetailsModalProps> = ({
  cocktail,
  onClose,
}) => (
  <div className="modal-overlay-custom">
    <div className="modal-content-custom">
      <button className="modal-close-custom" onClick={onClose}>
        &times;
      </button>
      <div className="modal-body-custom">
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className="modal-image-custom"
        />
        <div className="modal-details-custom">
          <h2>{cocktail.strDrink}</h2>
          <h4>Type: {cocktail.strCategory}</h4>
          <h4>Ingredients:</h4>
          <ul>
            {cocktail.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p>{cocktail.strInstructions}</p>
        </div>
      </div>
    </div>
  </div>
);

export default CocktailDetailsModal;
