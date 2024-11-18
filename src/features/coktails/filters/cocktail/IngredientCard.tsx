import React from 'react';
import { Ingredient } from '@/services/apiCoctels';

interface IngredientCardProps {
  ingredient: Ingredient;
  onShowDetails: (ingredient: string) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onShowDetails }) => (
  <div className="custom-CocktailCard">
    <img
      src={ingredient.image}
      alt={ingredient.name}
      className="custom-CocktailCard-img"
    />
    <div className="custom-CocktailCard-body">
      <h5 className="custom-CocktailCard-title">{ingredient.name || 'Unknown'}</h5>
      <button
        className="btn btn-primary"
        onClick={() => onShowDetails(ingredient.name)}
      >
        Ver Detalles
      </button>
    </div>
  </div>
);

export default IngredientCard;
