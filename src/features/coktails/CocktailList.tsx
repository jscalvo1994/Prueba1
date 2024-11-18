import React, { useState, useEffect } from "react";
import {
  searchCocktailsByName,
  fetchAllCocktails,
  Cocktail,
} from "@/services/apiCoctels";
import Navbar from "../navbar/Navbar";
import CocktailCard from "./filters/cocktail/CocktailCard";
import CocktailDetailsModal from "./filters/cocktail/CocktailDetailsModal";

const CocktailList: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(
    null
  );
  const [filterType, setFilterType] = useState<string>(""); // Filtro por tipo de bebida
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = searchQuery
          ? await searchCocktailsByName(searchQuery)
          : await fetchAllCocktails();

        setCocktails(data);
        setFilteredCocktails(data); // Inicializa los cócteles filtrados con todos
      } catch (err) {
        console.error("Error fetching cocktails:", err);
        setError("Failed to load cocktails.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleShowDetails = async (id: string) => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      if (data.drinks && data.drinks.length > 0) {
        const cocktail = data.drinks[0];
        const ingredients = Object.entries(cocktail)
          .filter(([key]) => key.startsWith("strIngredient") && cocktail[key])
          .map(([_, value]) => value as string);

        setSelectedCocktail({
          ...cocktail,
          ingredients,
        });
      }
    } catch (err) {
      console.error("Error fetching cocktail details:", err);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setFilterType(selectedType);

    if (selectedType) {
      const filtered = cocktails.filter(
        (cocktail) => cocktail.strCategory === selectedType
      );
      setFilteredCocktails(filtered);
    } else {
      setFilteredCocktails(cocktails); // Si no hay filtro, mostrar todos
    }
  };

  if (loading) return <p>Loading cocktails...</p>;
  if (error) return <p>{error}</p>;
  if (!cocktails.length) return <p>No cocktails found.</p>;

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Cocktails</h2>

        {/* Selector de Filtros */}
        <div className="mb-4">
          <label htmlFor="filter-type" className="form-label">
            Filter by Type:
          </label>
          <select
            id="filter-type"
            className="form-select"
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Cocktail">Cocktail</option>
            <option value="Shot">Shot</option>
            <option value="Ordinary Drink">Ordinary Drink</option>
            {/* Agrega más categorías si es necesario */}
          </select>
        </div>

        {/* Lista Filtrada */}
        <div className="row">
          {" "}
          {/* Rejilla para alinear las tarjetas */}
          {filteredCocktails.map((cocktail) => (
            <div className="col-md-3 mb-4" key={cocktail.idDrink}>
              <CocktailCard
                cocktail={cocktail}
                onShowDetails={handleShowDetails}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalles */}
      {selectedCocktail && (
        <CocktailDetailsModal
          cocktail={{
            strDrink: selectedCocktail.strDrink,
            strDrinkThumb: selectedCocktail.strDrinkThumb,
            strCategory: selectedCocktail.strCategory,
            strInstructions:
              selectedCocktail.strInstructions || "No instructions available.",
            ingredients: selectedCocktail.ingredients || [],
          }}
          onClose={() => setSelectedCocktail(null)} // Cierra el modal al hacer clic en el botón de cerrar
        />
      )}
    </div>
  );
};

export default CocktailList;
