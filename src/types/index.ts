/**
 * @fileoverview TypeScript type definitions for Cinema Platform Frontend
 * @description Core interfaces and types for the application
 * @version 1.0.0
 * @author Cinema Platform Team
 * @since 2025-09-30
 */

// ============================================
// API Response Types
// ============================================

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | null;
  errors?: string[] | null;
}

// ============================================
// User Types
// ============================================

/**
 * User model interface
 */
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User registration data
 */
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
}

/**
 * User login data
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * User profile update data
 */
export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
}

/**
 * Change password data
 */
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Auth context state
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================
// Movie Types (for future sprints)
// ============================================

/**
 * Movie model interface
 */
export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  duration: number;
  poster: string;
  videoUrl: string;
  subtitles?: {
    spanish?: string;
    english?: string;
  };
  averageRating?: number;
  totalRatings?: number;
  createdAt: string;
}

/**
 * Favorite model interface
 */
export interface Favorite {
  _id: string;
  userId: string;
  movieId: string;
  movie?: Movie;
  createdAt: string;
}

/**
 * Rating model interface
 */
export interface Rating {
  _id: string;
  userId: string;
  movieId: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Comment model interface
 */
export interface Comment {
  _id: string;
  userId: string;
  movieId: string;
  content: string;
  edited: boolean;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Form Types
// ============================================

/**
 * Form validation error
 */
export interface FormError {
  field: string;
  message: string;
}

/**
 * Form state
 */
export interface FormState<T> {
  values: T;
  errors: FormError[];
  isSubmitting: boolean;
  isDirty: boolean;
}

// ============================================
// UI Types
// ============================================

/**
 * Toast notification types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast notification
 */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

/**
 * Modal state
 */
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * Loading state
 */
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// ============================================
// Route Types
// ============================================

/**
 * Route configuration
 */
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  isProtected?: boolean;
  title?: string;
}

// ============================================
// Utility Types
// ============================================

/**
 * Pagination params
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Search params
 */
export interface SearchParams {
  query?: string;
  genre?: string[];
  sortBy?: 'title' | 'rating' | 'date';
  order?: 'asc' | 'desc';
}
