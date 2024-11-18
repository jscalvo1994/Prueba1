import axios from 'axios';

// Base URL de la API
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Cliente API configurado con Axios para manejar solicitudes
export const coctelApiClient = axios.create({
  baseURL: BASE_URL,
});

// ======================
// Tipos Definidos
// ======================

// Tipo detallado para Cócteles
export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
  strInstructions: string;
  ingredients: string[];
}

// Tipo detallado para Ingredientes
export interface Ingredient {
  id: number;               // ID único del ingrediente
  name: string;             // Nombre del ingrediente
  image: string;            // URL de la imagen del ingrediente
  description?: string;     // Descripción opcional del ingrediente
}

// Respuesta esperada al consultar cócteles
export interface CocktailResponse {
  drinks: Cocktail[] | null;
}

// Respuesta esperada al consultar ingredientes
export interface IngredientResponse {
  drinks: { strIngredient1: string }[];
}

// =========================
// Funciones de Cócteles
// =========================

// Obtener cócteles por la primera letra
export const listCocktailsByFirstLetter = async (letter: string): Promise<Cocktail[]> => {
  try {
    const response = await coctelApiClient.get<CocktailResponse>(`/search.php?f=${letter}`);
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error fetching cocktails by first letter:', error);
    throw new Error('Failed to fetch cocktails by first letter.');
  }
};

// Obtener todos los cócteles disponibles (por todas las letras del abecedario)
export const fetchAllCocktails = async (): Promise<Cocktail[]> => {
  try {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const requests = alphabet.map((letter) =>
      coctelApiClient.get<CocktailResponse>(`/search.php?f=${letter}`)
    );

    const responses = await Promise.allSettled(requests);

    return responses
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .flatMap((result) => result.value.data.drinks || [])
      .filter((drink): drink is Cocktail => !!drink);
  } catch (error) {
    console.error('Error fetching all cocktails:', error);
    throw new Error('Failed to fetch all cocktails.');
  }
};

// Obtener detalles de cócteles específicos mediante un array de IDs
export const fetchCocktailsByIds = async (ids: number[]): Promise<Cocktail[]> => {
  try {
    const requests = ids.map((id) =>
      coctelApiClient.get<CocktailResponse>(`/lookup.php?i=${id}`)
    );

    const responses = await Promise.allSettled(requests);

    return responses
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map((result) => result.value.data.drinks?.[0])
      .filter((drink): drink is Cocktail => !!drink);
  } catch (error) {
    console.error('Error fetching cocktails by IDs:', error);
    throw new Error('Failed to fetch cocktails by IDs.');
  }
};

// Buscar cócteles por nombre
export const searchCocktailsByName = async (name: string): Promise<Cocktail[]> => {
  try {
    if (!name.trim()) return [];
    const response = await coctelApiClient.get<CocktailResponse>(`/search.php?s=${name}`);
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error searching cocktails by name:', error);
    throw new Error('Failed to search cocktails by name.');
  }
};

// =========================
// Funciones de Ingredientes
// =========================

// Obtener todos los ingredientes disponibles
export const fetchIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await coctelApiClient.get<IngredientResponse>('/list.php?i=list');

    // Mapear los ingredientes para incluir el nombre, ID ficticio y URL de la imagen
    return response.data.drinks.map((ingredient, index) => ({
      id: index + 1, // Generar un ID único ficticio basado en el índice
      name: ingredient.strIngredient1,
      image: `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Medium.png`,
    }));
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw new Error('Failed to fetch ingredients.');
  }
};

// Buscar ingredientes por nombre
export const searchIngredientsByName = async (name: string): Promise<Ingredient[]> => {
  try {
    const allIngredients = await fetchIngredients();
    return allIngredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(name.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching ingredients by name:', error);
    throw new Error('Failed to search ingredients by name.');
  }
};
