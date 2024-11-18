import React from 'react';
import { Cocktail } from '@/services/apiCoctels';

interface CocktailCardProps {
  cocktail: Cocktail;
  onShowDetails: (id: string) => void;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, onShowDetails }) => (
  <div className="col-md-4 mb-3">
    <div className="card">
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{cocktail.strDrink}</h5>
        <p>
          <strong>Category:</strong> {cocktail.strCategory}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => onShowDetails(cocktail.idDrink)}
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default CocktailCard;
