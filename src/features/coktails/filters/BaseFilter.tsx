import React, { useState, useEffect } from 'react';
import { searchCocktailsByName, Cocktail } from '@/services/apiCoctels';
import RecipeModal from '@/views/modal/Recipemodal';
import './BaseFilter.css';

interface BaseFilterProps {
  placeholder: string;
  searchFunction: (query: string) => Promise<Cocktail[]>;
}

const BaseFilter: React.FC<BaseFilterProps> = ({ placeholder, searchFunction }) => {
  const [query, setQuery] = useState('');
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    const fetchCocktails = async () => {
      if (!query) {
        setCocktails([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await searchFunction(query);
        setCocktails(results);
      } catch (err) {
        console.error('Error fetching cocktails:', err);
        setError('Failed to load results.');
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [query, searchFunction]);

  const handleShowRecipe = (cocktail: Cocktail) => {
    const ingredients = Object.entries(cocktail)
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map(([, value]) => value as string);

    setSelectedCocktail({
      ...cocktail,
      ingredients,
    });
    const handleShowRecipe = (cocktail: Cocktail) => {
        // Filtra todas las propiedades que representan ingredientes
        const ingredients = Object.entries(cocktail)
          .filter(([key, value]) => key.startsWith('strIngredient') && value)
          .map(([, value]) => value as string);
      
        // Agrega los ingredientes dinámicamente al cóctel seleccionado
        setSelectedCocktail({
          ...cocktail,
          ingredients, // Lista generada de ingredientes
        });
      };



  };

  return (
    <div className="base-filter">
      <input
        type="text"
        className="form-control mb-3"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading results...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && cocktails.length === 0 && query && <p>No results found.</p>}

      <div className="row">
        {cocktails.map((cocktail) => (
          <div className="col-md-4 mb-3" key={cocktail.idDrink}>
            <div className="card">
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{cocktail.strDrink}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowRecipe(cocktail)}
                >
                  Receta
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para mostrar la receta */}
      <RecipeModal
        show={!!selectedCocktail}
        onClose={() => setSelectedCocktail(null)}
        cocktail={
          selectedCocktail && {
            name: selectedCocktail.strDrink,
            image: selectedCocktail.strDrinkThumb,
            instructions: selectedCocktail.strInstructions || 'No instructions available.',
            ingredients: selectedCocktail.ingredients || [],
          }
        }
      />
    </div>
  );
};

export default BaseFilter;
