import React, { useEffect } from 'react';
import axios from 'axios';

const IngredientFetcher: React.FC = () => {
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get<{ drinks: { strIngredient1: string }[] }>('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        console.log('Ingredientes:', response.data.drinks); // Muestra los datos en la consola
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  return <div>Check the console for ingredient data!</div>; // Muestra un mensaje mientras revisas la consola
};

export default IngredientFetcher;