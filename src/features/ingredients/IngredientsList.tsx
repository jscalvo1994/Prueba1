import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { fetchIngredients, Ingredient } from '@/services/apiCoctels';
import IngredientCard from '../coktails/filters/cocktail/IngredientCard';
import IngredientDetailsModal from '../coktails/filters/cocktail/IngredientDetailsModal';

const IngredientList: React.FC = () => {
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
        setFilteredIngredients(data);
      } catch (err) {
        console.error('Error loading ingredients:', err);
        setError('Failed to load ingredients.');
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(query)
    );
    setFilteredIngredients(filtered);
  };

  const handleShowDetails = (ingredient: string) => {
    console.log('Selected Ingredient:', ingredient);
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
          {filteredIngredients.map((ingredient) => (
            <div className="col-md-4 mb-3" key={ingredient.id}>
              <IngredientCard
                ingredient={ingredient}
                onShowDetails={handleShowDetails}
              />
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

export default IngredientList;
