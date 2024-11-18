import React, { useState, useEffect } from 'react';
import Navbar from '@/features/navbar/Navbar';
import CocktailCard from '../filters/cocktail/CocktailCard';
import { fetchAllCocktails, Cocktail } from '@/services/apiCoctels';

const CoctelByIngredient: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]); // Todos los cócteles
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]); // Cócteles filtrados
  const [filterQuery, setFilterQuery] = useState<string>(''); // Consulta de búsqueda
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  // Cargar todos los cócteles al montar el componente
  useEffect(() => {
    const loadCocktails = async () => {
      try {
        setLoading(true);
        const allCocktails = await fetchAllCocktails();
        setCocktails(allCocktails);
        setFilteredCocktails(allCocktails); // Inicializa los cócteles filtrados con todos
      } catch (err) {
        console.error('Error loading cocktails:', err);
        setError('Failed to load cocktails. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCocktails();
  }, []);

  // Manejar cambios en el cuadro de texto
  const handleFilterChange = (query: string) => {
    setFilterQuery(query); // Actualizamos la consulta de búsqueda

    if (!query.trim()) {
      setFilteredCocktails(cocktails); // Si no hay consulta, mostramos todos los cócteles
      return;
    }

    // Filtrar cócteles por coincidencia con los ingredientes
    const filtered = cocktails.filter((cocktail) =>
      cocktail.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredCocktails(filtered);
  };

  if (loading) return <p>Loading cocktails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Search Cocktails by Ingredient</h2>

        {/* Cuadro de texto para buscar por ingrediente */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Type to search by ingredient (e.g., 'Rum')..."
          value={filterQuery}
          onChange={(e) => handleFilterChange(e.target.value)}
        />

        {/* Lista de cócteles filtrados */}
        <div className="row">
          {filteredCocktails.map((cocktail) => (
            <div className="col-md-4 mb-4" key={cocktail.idDrink}>
              <CocktailCard
                cocktail={cocktail}
                onShowDetails={(id) => console.log(`Details for cocktail ID: ${id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoctelByIngredient;
