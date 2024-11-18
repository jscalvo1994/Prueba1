import React, { useEffect, useState } from 'react';
import { fetchCocktailsByIds, Cocktail } from '@/services/apiCoctels';
import Navbar from '../navbar/Navbar';
import CocktailCard from './filters/cocktail/CocktailCard';
import CocktailDetailsModal from './filters/cocktail/CocktailDetailsModal'; // Importamos el modal

const PopularCocktails: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Array de IDs populares
  const popularIds = [11011, 11012, 11013, 11014, 11015, 11016, 11017];

  // Función para cargar los cócteles
  useEffect(() => {
    const loadCocktails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener cócteles por IDs
        const fetchedCocktails = await fetchCocktailsByIds(popularIds);
        setCocktails(fetchedCocktails);
      } catch (err) {
        console.error('Error loading popular cocktails:', err);
        setError('Failed to load popular cocktails. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCocktails();
  }, []);

  // Función para manejar el evento de mostrar detalles
  const handleShowDetails = (id: string) => {
    const cocktail = cocktails.find((c) => c.idDrink === id);
    if (cocktail) {
      // Asegurar que `ingredients` siempre sea un array vacío si está indefinido
      const preparedCocktail = {
        ...cocktail,
        ingredients: cocktail.ingredients || [], // Garantizamos que `ingredients` sea un arreglo
      };

      setSelectedCocktail(preparedCocktail); // Establecemos el cóctel seleccionado
      setShowModal(true); // Mostramos el modal
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false); // Ocultamos el modal
    setSelectedCocktail(null); // Limpiamos el cóctel seleccionado
  };

  if (loading) return <p>Loading popular cocktails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <><Navbar />
    <div className="container mt-4"> {/* Contenedor principal con margen superior */}
      
      <h1 className="text-center mb-4">Popular Cocktails</h1> {/* Título centrado */}
      <div className="row"> {/* Rejilla para las tarjetas */}
        {cocktails.map((cocktail) => (
          <div className="col-md-3 mb-4" key={cocktail.idDrink}> {/* 4 tarjetas por fila */}
            <CocktailCard
              cocktail={cocktail}
              onShowDetails={handleShowDetails} // Pasamos la función para mostrar detalles
            />
          </div>
        ))}
      </div>

      {/* Renderizamos el modal solo si hay un cóctel seleccionado */}
      {showModal && selectedCocktail && (
        <CocktailDetailsModal
          cocktail={selectedCocktail}
          onClose={handleCloseModal}
        />
      )}
    </div>
    </>
  );
};


export default PopularCocktails;
