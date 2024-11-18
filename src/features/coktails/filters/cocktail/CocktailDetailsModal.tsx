import React from 'react';
import './CoctaiDetailsModal.css';

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
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <h2>{cocktail.strDrink}</h2>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className="modal-image"
      />
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
);

export default CocktailDetailsModal;
