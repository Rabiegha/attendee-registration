import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../config/api';
import { RootState } from '../../store';

export const logoutThunk = createAsyncThunk<
  boolean,
  void,
  { state: RootState; rejectValue: string }
>(
  'auth/logout',
  async (_, thunkAPI) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
      const state = thunkAPI.getState();
      const currentUserId = state.auth.currentUserId;
      
      if (!currentUserId) {
        // Pas d'utilisateur connecté
        clearTimeout(timeoutId);
        return true; // Considéré comme réussi puisqu'il n'y avait pas de session
      }
      
      // Appel API
      const url = `${BASE_URL}/ajax_user_logout/?current_user_login_details_id=${currentUserId}`;
      const response = await axios.post(url, {}, { signal: controller.signal });
      
      clearTimeout(timeoutId);
      
      if (response.data && response.data.status) {
        // Logout réussi
        return true;
      } else {
        // Logout échoué avec message d'erreur du serveur
        return thunkAPI.rejectWithValue(response.data.message || 'Logout failed');
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      return thunkAPI.rejectWithValue(
        error.message || 'An error occurred during logout'
      );
    }
  }
);
