import { authApiClient } from './apiClient'; // Cliente API configurado
import { LoginResponse, User } from './apiClient'; // Tipos necesarios para las funciones

/**
 * Realiza el login del usuario con las credenciales proporcionadas.
 * @param username - Nombre de usuario
 * @param password - Contraseña
 * @returns Una promesa que resuelve con los datos del usuario autenticado.
 */
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    // Realiza la solicitud POST para autenticar al usuario
    const response = await authApiClient.post<LoginResponse>('auth/login', {
      username,
      password,
    });

    console.log('Login Response:', response.data); // Log para depuración
    return response.data; // Retorna los datos del usuario autenticado
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Authentication failed. Please check your credentials.');
  }
};

/**
 * Obtiene información detallada del usuario autenticado mediante su ID.
 * @param id - ID único del usuario
 * @returns Una promesa que resuelve con la información del usuario.
 */
export const fetchUser = async (id: number): Promise<User> => {
  try {
    // Realiza la solicitud GET para obtener los datos del usuario
    const response = await authApiClient.get<User>(`users/${id}`);

    console.log('fetchUser Response:', response.data); // Log para depuración
    return response.data; // Retorna la información del usuario
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user details. Please try again.');
  }
};
