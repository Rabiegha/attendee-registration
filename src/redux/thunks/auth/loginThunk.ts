import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../config/api';

// Types
export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  current_user_login_details_id: string;
  username: string;
  user_fullname?: string;
}

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, thunkAPI) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      // Base64 encode pour sécuriser les données
      const encUserName = btoa(credentials.userName);
      const encPassword = btoa(credentials.password);

      // Appel API
      const url = `${BASE_URL}/ajax_user_login/?enc_email=${encUserName}&enc_password=${encPassword}`;
      const response = await axios.post<LoginResponse>(url, { signal: controller.signal });

      clearTimeout(timeoutId);

      if (response.data && response.data.status) {
        // Login réussi
        return response.data;
      } else {
        // Login échoué avec message d'erreur du serveur
        return thunkAPI.rejectWithValue(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      return thunkAPI.rejectWithValue(
        error.message || 'An error occurred during login'
      );
    }
  }
);
