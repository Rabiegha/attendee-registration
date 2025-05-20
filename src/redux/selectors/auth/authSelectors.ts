import {RootState} from '../../store';

// Sélecteurs pour les données d'authentification
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUserId = (state: RootState) => state.auth.currentUserId;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
