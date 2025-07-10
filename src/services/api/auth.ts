// src/services/api/auth.ts
import axios from 'axios';
import { env } from '@/config/env';
import { LoginCredentials, LoginResponse } from '@/types/auth.types';

const API_BASE_URL = env.API_URL;

// Update the import to use LoginResponse instead of AuthResponse
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/me`);
    return response.data;
  },
  
  logout: async () => {
    await axios.post(`${API_BASE_URL}/auth/logout`);
  }
};