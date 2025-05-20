import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEventList } from '../../../services/eventsListService';
import { RootState } from '../../store';

export const fetchPastEventsThunk = createAsyncThunk(
  'events/fetchPastEvents',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const userId = state.auth.currentUserId;

      if (!userId) {
        return thunkAPI.rejectWithValue('User is not authenticated');
      }

      const response = await fetchEventList(userId, 'past');
      
      if (!response.status || !response.event_details) {
        return thunkAPI.rejectWithValue(response.message || 'Failed to fetch past events');
      }

      // Format events data for our app
      const formattedEvents = response.event_details.map(event => ({
        id: event.id,
        name: event.name,
        location: event.location || 'N/A',
        startDate: event.start_date,
        endDate: event.end_date,
        description: event.description,
        image: event.image_url,
        attendeeCount: event.attendee_count
      }));

      return formattedEvents;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Error fetching past events');
    }
  }
);
