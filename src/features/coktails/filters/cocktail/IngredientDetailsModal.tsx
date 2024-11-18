import React from 'react';

interface IngredientDetailsModalProps {
  ingredient: string; // Nombre del ingrediente
  onClose: () => void; // Función para cerrar el modal
}

const IngredientDetailsModal: React.FC<IngredientDetailsModalProps> = ({
  ingredient,
  onClose,
}) => (
<div className="modal-overlay-custom-ingredients">
  <div className="custom-IngredientModal-content">
    {/* Imagen del ingrediente */}
    <img
      src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}
      alt={ingredient}
      className="custom-IngredientModal-img"
    />
    {/* Contenedor del texto */}
    <div className="custom-IngredientModal-text">
      <h2 className="custom-IngredientModal-title">{ingredient}</h2>
      <p>
        Explore drinks made with <strong>{ingredient}</strong>!
      </p>
      <p>
        Ingredients like <strong>{ingredient}</strong> can elevate your cocktail game.
      </p>
    </div>
    {/* Botón de cierre */}
    <button
      className="modal-close-custom-IngredientModal"
      onClick={onClose}
      aria-label="Close modal"
    >
      &times;
    </button>
  </div>
</div>
);

export default IngredientDetailsModal;
