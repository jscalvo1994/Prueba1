import React, { useEffect, useState } from 'react';
import { fetchCocktailsByIds, Cocktail } from '@/services/apiCoctels';
import Navbar from '../navbar/Navbar';

const PopularCocktails: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Array de IDs populares
  const popularIds = [11011, 11012, 11013, 11014, 11015, 11016, 11017];

  useEffect(() => {
    const loadCocktails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener cócteles por IDs
        const fetchedCocktails = await fetchCocktailsByIds(popularIds);
        setCocktails(fetchedCocktails);
        console.log('Popular cocktails:', fetchedCocktails);
      } catch (err) {
        console.error('Error loading popular cocktails:', err);
        setError('Failed to load popular cocktails. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCocktails();
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Popular Cocktails</h1>
      <div className="row">
        {cocktails.map((cocktail) => (
          <div className="col-md-4 mb-4" key={cocktail.idDrink}>
            <div className="card">
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{cocktail.strDrink}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCocktails;
