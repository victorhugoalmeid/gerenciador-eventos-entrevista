// src/features/events/eventsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  category: 'Conference' | 'Workshop' | 'Webinar' | 'Networking' | 'Other';
}

interface EventsState {
  items: Event[];
  loading: boolean;
}

const initialState: EventsState = {
  items: [],
  loading: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    //TODO: implementar depois
  },
});

export default eventsSlice.reducer;