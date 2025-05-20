/**
 * Utilitaire pour nettoyer les paramètres avant envoi à l'API
 * Supprime les valeurs undefined, null ou vides
 */
export const cleanParams = (params: Record<string, any>): Record<string, any> => {
  const cleanedParams: Record<string, any> = {};

  // Parcourir tous les paramètres et ne garder que ceux qui ont une valeur
  Object.keys(params).forEach(key => {
    const value = params[key];
    
    // Ne pas inclure les valeurs null, undefined ou chaînes vides
    if (value !== null && value !== undefined && value !== '') {
      cleanedParams[key] = value;
    }
  });

  return cleanedParams;
};
