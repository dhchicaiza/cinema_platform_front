/**
 * @fileoverview Authentication service
 * @description Handles all authentication-related API calls
 * @version 1.0.0
 * @author Cinema Platform Team
 * @since 2025-09-30
 */

import { apiClient } from './api';
import { API_ENDPOINTS } from '../constants';
import type {
  User,
  LoginData,
  RegisterData,
  UpdateProfileData,
  ChangePasswordData,
  ApiResponse,
} from '../types';

/**
 * Login response with token
 */
interface LoginResponse {
  user: User;
  token: string;
}

/**
 * Authentication service class
 */
class AuthService {
  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<ApiResponse<User>> {
    return apiClient.post<User>(API_ENDPOINTS.AUTH.REGISTER, data);
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT, undefined, true);
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE, true);
  }

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<ApiResponse<User>> {
    return apiClient.put<User>(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data, true);
  }

  /**
   * Delete user account
   */
  async deleteAccount(): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.AUTH.DELETE_ACCOUNT, true);
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });
  }

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordData): Promise<ApiResponse<void>> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data, true);
  }

  /**
   * Verify JWT token
   */
  async verifyToken(): Promise<ApiResponse<{ valid: boolean }>> {
    return apiClient.post<{ valid: boolean }>(
      API_ENDPOINTS.AUTH.VERIFY_TOKEN,
      undefined,
      true
    );
  }
}

// Create and export service instance
export const authService = new AuthService();

// Export type for use in other files
export type { AuthService };
