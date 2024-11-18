import React from 'react';
import './IngredientDetailsModal.css';

interface IngredientDetailsModalProps {
  ingredient: string;
  onClose: () => void;
}

const IngredientDetailsModal: React.FC<IngredientDetailsModalProps> = ({
  ingredient,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{ingredient}</h2>
        <img
          src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}
          alt={ingredient}
          className="modal-image"
        />
        <p>
          Información detallada sobre el ingrediente "{ingredient}" podría ser
          obtenida de otro endpoint o añadida aquí manualmente.
        </p>
      </div>
    </div>
  );
};

export default IngredientDetailsModal;
