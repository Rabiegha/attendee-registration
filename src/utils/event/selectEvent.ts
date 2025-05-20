import {useDispatch} from 'react-redux';
import {selectEvent as selectEventAction} from '../../redux/slices/eventsSlice';

/**
 * Hook personnalisé pour sélectionner un événement
 * 
 * Particulièrement utile pour les interactions qui nécessitent de sélectionner un événement 
 * et de réaliser des actions associées.
 */
export const useEventSelector = () => {
  const dispatch = useDispatch();

  /**
   * Sélectionne un événement pour l'afficher ou interagir avec
   * @param event L'objet événement complet à sélectionner
   */
  const selectEvent = (event) => {
    if (!event || !event.id) {
      console.warn('Tentative de sélection d\'un événement invalide');
      return;
    }
    
    // Dispatch l'action Redux pour mettre à jour l'événement sélectionné
    dispatch(selectEventAction(event));
  };

  return selectEvent;
};
