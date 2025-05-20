/**
 * Utilitaire pour gérer les erreurs API de manière cohérente
 */
export const handleApiError = (error: any, fallbackMessage: string): void => {
  if (error.response) {
    // Erreur avec réponse du serveur
    const status = error.response.status;
    const data = error.response.data;
    
    console.error(`API Error ${status}:`, data);
    
    // Log spécifique en fonction du code erreur
    if (status === 401) {
      console.error('Unauthorized: Authentication failed');
    } else if (status === 403) {
      console.error('Forbidden: Insufficient permissions');
    } else if (status === 404) {
      console.error('Not Found: Resource does not exist');
    } else if (status >= 500) {
      console.error('Server Error: Please try again later');
    }
  } else if (error.request) {
    // Requête envoyée mais pas de réponse
    console.error('Network Error: No response received', error.request);
  } else {
    // Erreur lors de la préparation de la requête
    console.error('Request Error:', error.message);
  }
  
  // Log du message d'erreur par défaut pour le débogage
  console.error(fallbackMessage);
};
