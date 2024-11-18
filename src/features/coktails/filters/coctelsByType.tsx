import React, { useState, useEffect } from 'react';
import Navbar from '@/features/navbar/Navbar';
import CocktailCard from '../filters/cocktail/CocktailCard';
import { fetchAllCocktails, Cocktail } from '@/services/apiCoctels';

const CoctelByType: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]); // Todos los cócteles
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]); // Cócteles filtrados
  const [filterQuery, setFilterQuery] = useState<string>(''); // Consulta del filtro
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

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
    setFilterQuery(query); // Actualizamos la consulta del filtro

    if (!query.trim()) {
      setFilteredCocktails(cocktails); // Si no hay consulta, mostramos todos los cócteles
      return;
    }

    // Filtrar cócteles por coincidencia con `strCategory`
    const filtered = cocktails.filter((cocktail) =>
      cocktail.strCategory.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCocktails(filtered);
  };

  if (loading) return <p>Loading cocktails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Search Cocktails by Type</h2>

        {/* Cuadro de texto para filtrar por tipo */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Type to filter (e.g., 'Shot')..."
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

export default CoctelByType;
