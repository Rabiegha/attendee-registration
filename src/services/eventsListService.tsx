import { handleApiError } from '../utils/api/handleApiError';
import { cleanParams } from '../utils/api/cleanParams';
import mainApi from '../config/mainApi';

export const fetchEventList = async (userId, isEventFrom) => {
  try {
    const params = cleanParams({
      current_user_login_details_id: userId,
      is_event_from: isEventFrom,
    });

    const response = await mainApi.get(
      '/ajax_get_event_details/',
      { params }
    );

    if (!response.data || !response.data.status || !response.data.event_details) {
      console.log('Params sent to API:', params);
      console.log('Full API response:', response.data);
      throw new Error(response.data?.message || 'Invalid event data from server');
    }

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch event list');
    throw error; // pour que le hook ou composant appelant puisse réagir si besoin
  }
};
