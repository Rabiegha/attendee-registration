import { handleApiError } from '../utils/api/handleApiError';
import { cleanParams } from '../utils/api/cleanParams';
import mainApi from '../config/mainApi';

// Type pour les données d'inscription d'un participant
export interface AttendeeRegistrationData {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  registrationType: string;
  notes?: string;
  userId: string;
}

/**
 * Service pour inscrire un nouveau participant à un événement
 */
export const registerAttendee = async (registrationData: AttendeeRegistrationData) => {
  try {
    const { userId, eventId, ...attendeeData } = registrationData;
    
    // Paramètres pour l'API
    const params = cleanParams({
      current_user_login_details_id: userId,
      event_id: eventId,
      ...attendeeData
    });

    // Vérification des champs obligatoires
    if (!userId || !eventId || !attendeeData.firstName || !attendeeData.lastName || !attendeeData.email) {
      throw new Error('Missing required registration fields');
    }

    // Appel API pour enregistrer le participant
    const response = await mainApi.post(
      '/ajax_register_attendee/',
      params
    );

    if (!response.data || !response.data.status) {
      console.log('Registration API response:', response.data);
      throw new Error(response.data?.message || 'Registration failed');
    }

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to register attendee');
    throw error;
  }
};

/**
 * Service pour récupérer la liste des participants d'un événement
 */
export const fetchAttendeesList = async (userId: string, eventId: string) => {
  try {
    const params = cleanParams({
      current_user_login_details_id: userId,
      event_id: eventId,
    });

    const response = await mainApi.get(
      '/ajax_get_event_attendee_list/',
      { params }
    );

    if (!response.data || !response.data.status) {
      console.log('Attendees list API response:', response.data);
      throw new Error(response.data?.message || 'Failed to fetch attendees list');
    }

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch attendees list');
    throw error;
  }
};
