// src/features/events/eventsSlice.ts
"use client";

import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  Event,
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/services/eventsService";

interface EventsState {
  items: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
};

export const loadEvents = createAsyncThunk("events/load", async () => {
  const events = await fetchEvents();
  return events;
});

export const addEvent = createAsyncThunk(
  "events/add",
  async (event: Event) => {
    const created = await createEvent(event);
    return created;
  }
);

export const editEvent = createAsyncThunk(
  "events/edit",
  async (event: Event) => {
    if (!event.id) {
      throw new Error("Evento sem ID para edição");
    }
    const updated = await updateEvent(event.id, event);
    return updated;
  }
);

export const removeEvent = createAsyncThunk(
  "events/remove",
  async (id: number) => {
    await deleteEvent(id);
    return id;
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load
      .addCase(loadEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(loadEvents.rejected, (state) => {
        state.loading = false;
        state.error = "Não foi possível carregar os eventos";
      })

      // add
      .addCase(addEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.items.push(action.payload);
      })

      // edit
      .addCase(editEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.items = state.items.map((ev) =>
          ev.id === action.payload.id ? action.payload : ev
        );
      })

      // remove
      .addCase(
        removeEvent.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter((ev) => ev.id !== action.payload);
        }
      );
  },
});

export default eventsSlice.reducer;
//O slice controla loading, erro e mantém a lista de eventos atualizada localmente.
