import axios from 'axios';
// Cliente para DummyJSON Auth API
export const authApiClient = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 10000, // Tiempo de espera de 10 segundos
});// solicitud de autenticación

//Export data user

export type User = {
  id: number; // ID del usuario
  username: string; // Nombre de usuario
  email: string; // Correo electrónico del usuario
  firstName: string; // Nombre del usuario
  lastName: string; // Apellido del usuario
  gender: string; // Género del usuario
  image: string; // URL de la imagen
  accessToken?: string; // Campo opcional para el token, solo relevante en autenticación
  password: string; // Campo opcional para la contraseña, solo relevante en autenticación
};
export const defaultUser: User = {
  id: 0,
  username: 'exampleUser',
  email: 'example@example.com',
  firstName: 'John',
  lastName: 'Doe',
  gender: 'Prefer not to say',
  image: '/icons/reshot-icon-profile-QX6KDSLJC5.svg',
  password: 'examplePass',
};
export type UserData = Omit<User, 'password' | 'accessToken'>; // Excluye la contraseña y el token
export type LoginResponse = Pick<User, 'id' | 'username' | 'accessToken'>; // Tipado de la respuesta de login

export const fillDefaultValues = (data: Partial<User>): User => ({
  ...defaultUser,
  ...data, // Sobrescribe los valores predeterminados con los proporcionados
});
 
//End data user