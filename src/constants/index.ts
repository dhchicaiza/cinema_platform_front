/**
 * @fileoverview Application constants
 * @description Centralized constants for the Cinema Platform
 * @version 1.0.0
 * @author Cinema Platform Team
 * @since 2025-09-30
 */

// ============================================
// API Configuration
// ============================================

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

// ============================================
// Storage Keys
// ============================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cinema_auth_token',
  USER_DATA: 'cinema_user_data',
  THEME: 'cinema_theme',
  LANGUAGE: 'cinema_language',
} as const;

// ============================================
// Route Paths
// ============================================

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  CATALOG: '/catalog',
  MOVIE_DETAIL: '/movie/:id',
  FAVORITES: '/favorites',
  ABOUT: '/about',
  HELP: '/help',
} as const;

// ============================================
// API Endpoints
// ============================================

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile',
    UPDATE_PROFILE: '/api/auth/profile',
    DELETE_ACCOUNT: '/api/auth/account',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    CHANGE_PASSWORD: '/api/auth/change-password',
    VERIFY_TOKEN: '/api/auth/verify-token',
  },
  // Movie endpoints (future sprints)
  MOVIES: {
    LIST: '/api/movies',
    DETAIL: '/api/movies/:id',
    SEARCH: '/api/movies/search',
  },
  // Favorites endpoints (future sprints)
  FAVORITES: {
    LIST: '/api/favorites',
    ADD: '/api/favorites',
    REMOVE: '/api/favorites/:id',
  },
  // Ratings endpoints (future sprints)
  RATINGS: {
    LIST: '/api/ratings',
    ADD: '/api/ratings',
    UPDATE: '/api/ratings/:id',
    DELETE: '/api/ratings/:id',
  },
  // Comments endpoints (future sprints)
  COMMENTS: {
    LIST: '/api/comments',
    ADD: '/api/comments',
    UPDATE: '/api/comments/:id',
    DELETE: '/api/comments/:id',
  },
} as const;

// ============================================
// Validation Rules
// ============================================

export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-ZÀ-ÿ\s]+$/,
  },
  AGE: {
    MIN: 13,
    MAX: 120,
  },
} as const;

// ============================================
// UI Constants
// ============================================

export const TOAST_DURATION = 3000; // milliseconds
export const DEBOUNCE_DELAY = 300; // milliseconds
export const ITEMS_PER_PAGE = 20;

// ============================================
// Movie Genres (for future sprints)
// ============================================

export const MOVIE_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Western',
] as const;

// ============================================
// Error Messages
// ============================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  SERVER_ERROR: 'Error del servidor. Por favor, intenta más tarde.',
  UNAUTHORIZED: 'No tienes autorización para realizar esta acción.',
  NOT_FOUND: 'El recurso solicitado no existe.',
  VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.',
} as const;

// ============================================
// Success Messages
// ============================================

export const SUCCESS_MESSAGES = {
  LOGIN: '¡Bienvenido de nuevo!',
  REGISTER: 'Cuenta creada exitosamente.',
  LOGOUT: 'Sesión cerrada correctamente.',
  PROFILE_UPDATED: 'Perfil actualizado correctamente.',
  PASSWORD_CHANGED: 'Contraseña cambiada exitosamente.',
  PASSWORD_RESET_SENT: 'Instrucciones enviadas a tu correo.',
} as const;
