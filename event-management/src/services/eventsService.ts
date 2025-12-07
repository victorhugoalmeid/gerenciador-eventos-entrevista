// src/services/eventsService.ts
import { api } from "./api";

export type EventCategory =
  | "Conferência"
  | "Workshop"
  | "Webinar"
  | "Networking"
  | "Outro";

export interface Event {
  id?: number;
  name: string;
  date: string;
  location: string;
  description: string;
  category: EventCategory;
}

export async function fetchEvents() {
  const response = await api.get<Event[]>("/events");
  return response.data;
}

export async function createEvent(event: Event) {
  const response = await api.post<Event>("/events", event);
  return response.data;
}

export async function updateEvent(id: number, event: Event) {
  const response = await api.put<Event>(`/events/${id}`, event);
  return response.data;
}

export async function deleteEvent(id: number) {
  await api.delete(`/events/${id}`);
  return id;
}
