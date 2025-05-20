import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFutureEventsThunk } from '../thunks/event/fetchFutureEventsThunk';
import { fetchPastEventsThunk } from '../thunks/event/fetchPastEventsThunk';

interface Event {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  image?: string;
  attendeeCount?: number;
}

interface EventsState {
  futureEvents: Event[];
  pastEvents: Event[];
  selectedEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  futureEvents: [],
  pastEvents: [],
  selectedEvent: null,
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    selectEvent: (state, action: PayloadAction<Event>) => {
      state.selectedEvent = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    resetEventsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Future events
    builder.addCase(fetchFutureEventsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchFutureEventsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.futureEvents = action.payload;
    });
    builder.addCase(fetchFutureEventsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ? String(action.payload) : 'Failed to fetch future events';
    });

    // Past events
    builder.addCase(fetchPastEventsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPastEventsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pastEvents = action.payload;
    });
    builder.addCase(fetchPastEventsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ? String(action.payload) : 'Failed to fetch past events';
    });
  },
});

export const { selectEvent, clearSelectedEvent, resetEventsError } = eventsSlice.actions;
export default eventsSlice.reducer;
