import React from 'react';
import { Cocktail } from '@/services/apiCoctels'; // Importamos el tipo de datos `Cocktail`


// Propiedades del componente CocktailCard
interface CocktailCardProps {
  cocktail: Cocktail; // Objeto que contiene los datos del cóctel
  onShowDetails: (id: string) => void; // Función para manejar el evento de mostrar detalles
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, onShowDetails }) => (
  <div className="custom-CocktailCard"> {/* Contenedor principal de la tarjeta */}
    <img
      src={cocktail.strDrinkThumb} // Imagen del cóctel
      alt={cocktail.strDrink} // Texto alternativo con el nombre del cóctel
      className="custom-CocktailCard-img" // Clase CSS personalizada para la imagen
    />
    <div className="custom-CocktailCard-body"> {/* Contenedor para el contenido textual */}
      <h5 className="custom-CocktailCard-title">{cocktail.strDrink || 'Unknown'}</h5>
      <p>
        <strong>Category:</strong> {cocktail.strCategory || 'Uncategorized'}
      </p>
      <button
        className="btn btn-primary"
        onClick={() => onShowDetails(cocktail.idDrink)} // Evento para mostrar detalles
        aria-label={`View details for ${cocktail.strDrink}`} // Mejora de accesibilidad
      >
        View Details
      </button>
    </div>
  </div>
);

export default CocktailCard;
