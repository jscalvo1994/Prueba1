import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { fetchIngredients, Ingredient } from '@/services/apiCoctels';
import './IngredientsList.css';
import IngredientDetailsModal from './IngredientDetailsModal';

const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setLoading(true);
        const data = await fetchIngredients();
        setIngredients(data);
        setFilteredIngredients(data); // Inicialmente, todos los ingredientes están visibles
      } catch (err) {
        console.error('Error loading ingredients:', err);
        setError('Failed to load ingredients.');
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
  }, []);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = ingredients.filter((ingredient) =>
      ingredient.strIngredient1.toLowerCase().includes(query)
    );
    setFilteredIngredients(filtered);
  };

  const handleShowDetails = (ingredient: string) => {
    setSelectedIngredient(ingredient);
  };

  const handleCloseDetails = () => {
    setSelectedIngredient(null);
  };

  if (loading) return <p>Loading ingredients...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Ingredients List</h1>

        {/* Cuadro de texto para búsqueda */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search ingredients..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div className="row">
          {filteredIngredients.map((ingredient, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <img
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Medium.png`}
                  alt={ingredient.strIngredient1}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{ingredient.strIngredient1}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleShowDetails(ingredient.strIngredient1)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedIngredient && (
        <IngredientDetailsModal
          ingredient={selectedIngredient}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default IngredientsList;
