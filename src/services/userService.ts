import { authApiClient } from './apiClient'; // Cliente API configurado
import { User } from './apiClient'; // Tipo de datos para los usuarios

/**
 * Obtiene una lista de usuarios desde la API.
 * @returns Una promesa que resuelve con una lista de usuarios (máximo 10).
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Realiza la solicitud GET para obtener la lista de usuarios con un límite de 10
    const response = await authApiClient.get<{ users: User[] }>('users?limit=10');

    console.log('Usuarios obtenidos:', response.data.users); // Log para depuración
    return response.data.users; // Retorna la lista de usuarios
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('Failed to fetch users. Please try again.');
  }
};
