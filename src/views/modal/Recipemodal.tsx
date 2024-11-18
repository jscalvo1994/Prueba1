import React from 'react';
import './RecipeModal.css';

interface RecipeModalProps {
  show: boolean; // Determina si el modal se muestra
  onClose: () => void; // Función para cerrar el modal
  cocktail: {
    name: string;
    image: string;
    instructions: string;
    ingredients: string[];
  } | null; // Detalles del cóctel seleccionado
}

const RecipeModal: React.FC<RecipeModalProps> = ({ show, onClose, cocktail }) => {
  if (!show || !cocktail) return null; // Si no hay datos o no se debe mostrar, no renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Botón para cerrar el modal */}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        {/* Título del cóctel */}
        <h2 className="modal-title">{cocktail.name}</h2>

        {/* Imagen del cóctel */}
        <img src={cocktail.image} alt={cocktail.name} className="modal-image" />

        {/* Lista de ingredientes */}
        <h4>Ingredients:</h4>
        <ul>
          {cocktail.ingredients.length > 0 ? (
            cocktail.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <li>No ingredients available.</li>
          )}
        </ul>

        {/* Instrucciones para preparar el cóctel */}
        <h4>Instructions:</h4>
        <p>{cocktail.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeModal;
