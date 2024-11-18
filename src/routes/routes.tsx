import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import Login from '../features/auth/Login';
import ProtectedRoute from './ProtectedRoute';
import React from 'react';
import NotFound from '../components/NotFound';
import NewUser from '@/components/NewUser';
import CocktailList from '../features/coktails/CocktailList';
import IngredientsList from '../features/ingredients/IngredientsList';
import UserManagement from '@/components/UserManagement';
import PopularCocktails from '@/features/coktails/PopularCocktails';
import CoctelsByType from '@/features/coktails/filters/coctelsByType';
import ByCategory from '@/features/coktails/filters/DrinkTypesFilter';
import coctelByIngredient from '@/features/coktails/filters/IngredientTypesFilter';
// Ruta raíz
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Rutas públicas
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
});

const createUserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new-user',
  component: NewUser,
});

// Rutas protegidas
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/protected',
  component: ProtectedRoute,
});

// Hijas de la ruta protegida


const cocktailsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/cocktails',
  component: CocktailList,
});

const cocktailPopular = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/populars',
  component: PopularCocktails,
});

const ingredientsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/ingredients',
  component: IngredientsList,
});
// Subrutas del submenú "Filters"
const filtersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/filters',
  component: () => <Outlet />, // Punto de entrada para las subrutas de filtros
});

const byTypeRoute = createRoute({
  getParentRoute: () => filtersRoute,
  path: 'type',
  component: CoctelsByType,
});

const byCategoryRoute = createRoute({
  getParentRoute: () => filtersRoute,
  path: 'category',
  component: ByCategory,
});

const byIngredientRoute = createRoute({
  getParentRoute: () => filtersRoute,
  path: 'ingredient',
  component: coctelByIngredient,
});

// Configuración del router
export const router = createRouter({
  routeTree: rootRoute.addChildren([
    loginRoute,
    createUserRoute,
    
    protectedRoute.addChildren([
      cocktailsRoute,
      ingredientsRoute,
      cocktailPopular,
      filtersRoute.addChildren([byTypeRoute, byCategoryRoute, byIngredientRoute]),
    ]),
  ]),
  defaultNotFoundComponent: NotFound,
});

