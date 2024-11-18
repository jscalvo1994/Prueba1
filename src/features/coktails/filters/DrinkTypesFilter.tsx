import React from 'react';
import BaseFilter from './BaseFilter';
import { searchCocktailsByName } from '@/services/apiCoctels'; // Reemplaza con la función específica si aplica
import Navbar from '@/features/navbar/Navbar';

const CoctelByCategory: React.FC = () => {
  return (
    <>
    <Navbar />
    <BaseFilter
      placeholder="Search by category..."
      searchFunction={searchCocktailsByName} // Cambia según tu lógica
    />
    </>
  );
};

export default CoctelByCategory;
