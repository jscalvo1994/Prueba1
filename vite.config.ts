import react from '@vitejs/plugin-react-swc'; // Soporte para React con SWC
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vitest/config';

// Simula __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Vite
export default defineConfig({
  // Plugins utilizados en el proyecto
  plugins: [react()],

  // Configuración de construcción
  build: {
    target: 'esnext', // Salida para navegadores modernos
    sourcemap: true,  // Generar mapas de fuente para depuración
    outDir: 'dist',   // Carpeta de salida para archivos generados
  },

  // Configuración para CSS Modules
  css: {
    modules: {
      scopeBehaviour: 'local', // Asegura que los estilos sean locales por defecto
    },
  },

  // Resolución de alias para rutas más cortas
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Alias '@' apunta a la carpeta 'src'
    },
  },

  // Configuración de pruebas con Vitest
  test: {
    globals: true, // Habilita variables globales como "describe", "it", "expect"
    environment: 'jsdom', // Simula un DOM en Node.js para pruebas de React
    setupFiles: './src/setupTests.ts', // Archivo para configuraciones globales de pruebas
    css: true, // Soporte para importar archivos CSS en las pruebas
  },
});
