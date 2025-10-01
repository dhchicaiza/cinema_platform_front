/**
 * @fileoverview API service for making HTTP requests
 * @description Centralized API client using fetch
 * @version 1.0.0
 * @author Cinema Platform Team
 * @since 2025-09-30
 */

import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants';
import { ApiResponse } from '../types';

/**
 * Request configuration options
 */
interface RequestConfig extends RequestInit {
  timeout?: number;
  requiresAuth?: boolean;
}

/**
 * API client class for making HTTP requests
 */
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string, timeout: number) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  /**
   * Get authentication token from localStorage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Build headers for request
   */
  private buildHeaders(requiresAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Make HTTP request with timeout
   */
  private async fetchWithTimeout(
    url: string,
    config: RequestConfig
  ): Promise<Response> {
    const { timeout = this.timeout, ...fetchConfig } = config;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return empty response for non-JSON responses
    return {
      success: true,
      message: 'Success',
      data: undefined as T,
    };
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, requiresAuth: boolean = false): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestConfig = {
      method: 'GET',
      headers: this.buildHeaders(requiresAuth),
      requiresAuth,
    };

    const response = await this.fetchWithTimeout(url, config);
    return this.handleResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: any,
    requiresAuth: boolean = false
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestConfig = {
      method: 'POST',
      headers: this.buildHeaders(requiresAuth),
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    };

    const response = await this.fetchWithTimeout(url, config);
    return this.handleResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: any,
    requiresAuth: boolean = false
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestConfig = {
      method: 'PUT',
      headers: this.buildHeaders(requiresAuth),
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    };

    const response = await this.fetchWithTimeout(url, config);
    return this.handleResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    requiresAuth: boolean = false
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestConfig = {
      method: 'DELETE',
      headers: this.buildHeaders(requiresAuth),
      requiresAuth,
    };

    const response = await this.fetchWithTimeout(url, config);
    return this.handleResponse<T>(response);
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL, API_TIMEOUT);

// Export type for use in other services
export type { ApiClient };
