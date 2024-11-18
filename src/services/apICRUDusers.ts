import { authApiClient } from './apiClient'; // Cliente API configurado
import { fillDefaultValues, User } from './apiClient'; // Función para aplicar valores predeterminados

/**
 * Crea un nuevo usuario en la API simulada.
 * @param userData - Información parcial del usuario proporcionada por el cliente.
 * @returns El usuario creado con valores predeterminados aplicados.
 */
export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    // Realiza la solicitud POST a la API para agregar un nuevo usuario
    const response = await authApiClient.post<Partial<User>>('/users/add', userData);

    console.log('Respuesta de la API (usuario simulado):', response.data);

    // Aplica valores predeterminados para campos que no se hayan proporcionado
    const userWithDefaults = fillDefaultValues(response.data);

    // Almacena el usuario creado en localStorage para persistencia
    localStorage.setItem('newUser', JSON.stringify(userWithDefaults));

    return userWithDefaults; // Retorna el usuario con los valores aplicados
  } catch (error) {
    console.error('Error creando usuario:', error);
    throw new Error('No se pudo crear el usuario. Por favor, intente nuevamente.');
  }
};
