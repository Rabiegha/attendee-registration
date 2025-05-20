/**
 * Centralisation des imports d'icônes pour l'application
 * Ce fichier permet d'avoir un point unique pour tous les imports d'icônes
 */

const Icons = {
  // Icônes de visibilité du mot de passe
  Vu: require('./visible.png'),
  PasVu: require('./hidden.png'),
  
  // Icônes de navigation
  Back: require('./back.png'),
  Menu: require('./menu.png'),
  
  // Icônes pour les événements
  Event: require('./event.png'),
  Location: require('./location.png'),
  Calendar: require('./calendar.png'),
  
  // Icônes pour les formulaires
  Check: require('./check.png'),
  Cancel: require('./cancel.png'),
  
  // Icônes de recherche
  Search: require('./search.png'),
  Clear: require('./clear.png'),
};

export default Icons;
