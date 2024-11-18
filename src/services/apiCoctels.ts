import axios from 'axios';

// Base URL de la API
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Cliente API configurado con Axios para manejar solicitudes
export const coctelApiClient = axios.create({
  baseURL: BASE_URL,
});

// Tipos definidos para los cócteles
export interface Cocktail {
  idDrink: string;           // ID único del cóctel
  strDrink: string;          // Nombre del cóctel
  strDrinkThumb: string;     // URL de la imagen del cóctel
  strCategory: string;       // Categoría del cóctel
  strAlcoholic: string;      // Información sobre si el cóctel contiene alcohol
  strInstructions: string;   // Instrucciones para preparar el cóctel
  ingredients?: string[];    // Lista de ingredientes (opcional)
}

// Respuesta esperada al consultar cócteles
export interface CocktailResponse {
  drinks: Cocktail[] | null;
}

// Tipos definidos para los ingredientes
export interface Ingredient {
  strIngredient1: string;    // Nombre del ingrediente
}

// Respuesta esperada al consultar ingredientes
export interface IngredientResponse {
  drinks: Ingredient[];
}

// =====================
// Funciones de Cócteles
// =====================

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
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''); // Array con todas las letras
    const requests = alphabet.map((letter) =>
      coctelApiClient.get<CocktailResponse>(`/search.php?f=${letter}`)
    );

    // Ejecutar todas las solicitudes concurrentemente
    const responses = await Promise.allSettled(requests);

    // Filtrar resultados exitosos y combinar listas de cócteles
    return responses
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .flatMap((result) => result.value.data.drinks || [])
      .filter((drink): drink is Cocktail => !!drink); // Filtrar resultados válidos
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

    // Manejar solicitudes concurrentes
    const responses = await Promise.allSettled(requests);

    // Filtrar resultados exitosos y combinar detalles de cócteles
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
    if (!name.trim()) return []; // Retorna un array vacío si el nombre está vacío
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
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw new Error('Failed to fetch ingredients.');
  }
};
