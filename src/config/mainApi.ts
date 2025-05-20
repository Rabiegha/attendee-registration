import axios from 'axios';
import { BASE_URL, API_TIMEOUT } from './api';

// Configuration principale pour axios
const mainApi = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour les requêtes
mainApi.interceptors.request.use(
  (config) => {
    // Vous pouvez ajouter ici des tokens d'authentification si nécessaire
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
mainApi.interceptors.response.use(
  (response) => {
    // Traitement des réponses réussies
    return response;
  },
  (error) => {
    // Gestion des erreurs réseau ou API
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      console.error('API Error Response:', error.response.data);
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      console.error('API No Response:', error.request);
    } else {
      // Erreur lors de la préparation de la requête
      console.error('API Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default mainApi;
