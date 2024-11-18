Requisitos Previos
Node.js >= 14.x
NPM >= 6.x o Yarn >= 1.x
Vite como servidor de desarrollo.
Pasos para Instalar
Clonar el Repositorio:

bash
Copiar código
https://github.com/jscalvo1994/Prueba1.git
cd MyCocktailApp
Instalar Dependencias:

Usando NPM:

bash
Copiar código
npm install
Usando Yarn:

bash
Copiar código
yarn install
Configurar el Entorno:

Crea un archivo .env en la raíz del proyecto y define las siguientes variables si es necesario (dependerá de tus APIs externas):

arduino
Copiar código
VITE_API_BASE_URL=https://www.thecocktaildb.com/api/json/v1/1
VITE_AUTH_API_URL=https://dummyjson.com
Iniciar el Servidor de Desarrollo:

Usando NPM:

bash
Copiar código
npm run dev
Usando Yarn:

bash
Copiar código
yarn dev
La aplicación estará disponible en: http://localhost:5173

Construir para Producción (Opcional):

Usando NPM:

bash
Copiar código
npm run build
Usando Yarn:

bash
Copiar código
yarn build
Tecnologías Utilizadas
Frontend: React, TypeScript, Vite, Bootstrap.
Estado Global: Redux.
Enrutamiento: TanStack Router.
Pruebas: Vitest, React Testing Library.
APIs Externas:
TheCocktailDB
DummyJSON
Contribuciones
¡Contribuciones son bienvenidas! Si encuentras un problema o tienes una mejora, por favor abre un issue o envía un pull request.

Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

¿Qué Tiene el Proyecto?
esta realizado en TypeScrip

Autenticación y Gestión de Usuario
Inicio de sesión con validación de credenciales mediante la API de DummyJSON.
Registro de nuevos usuarios con datos persistidos en localStorage.
Edición de perfil con la capacidad de guardar cambios en localStorage.
Cierre de sesión con limpieza de datos de autenticación.
Exploración de Cócteles
Listado de cócteles populares e ingredientes.
Filtros avanzados por:
Tipo de bebida.
Categoría.
Ingredientes.
Detalles completos de cada cóctel:
Ingredientes necesarios.
Descripción de preparación.
Imagen representativa.
Listado aleatorio de cócteles e ingredientes para explorar.
Interfaz y Navegación
Barra de búsqueda funcional para encontrar cócteles por nombre.
Navegación responsiva y fluida con TanStack Router.
Diseño limpio y profesional basado en Bootstrap.
Tecnologías Utilizadas
React, TypeScript, Vite.
Redux para manejo de estado global.
API de TheCocktailDB y DummyJSON.
¿Qué No Tiene el Proyecto?
Pruebas Automáticas:

No se han implementado pruebas con Vitest u otras herramientas.
Faltan validaciones automatizadas para:
El flujo de autenticación.
El comportamiento de las rutas protegidas.
La funcionalidad de filtros y CRUD de usuarios.
Validación Extensiva en Formularios:

Las entradas de texto no tienen validaciones exhaustivas (como email válido o contraseñas seguras).
Optimización para Producción:

Aunque está configurado el comando build, no se han realizado ajustes avanzados para mejorar el rendimiento en un entorno de producción.
Funciones Avanzadas de Usuario:

No hay soporte para eliminar usuarios o gestionar múltiples perfiles.


