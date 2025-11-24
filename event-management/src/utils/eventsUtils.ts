// src/utils/eventsUtils.ts
import { Event } from "@/services/eventsService";

export type SortField = "date" | "name";

export type SortOrder = "asc" | "desc";

export interface SplitEvents {
  upcoming: Event[];
  past: Event[];
}

export function splitEventsByDate(events: Event[]): SplitEvents {
  const now = new Date();

  const upcoming: Event[] = [];
  const past: Event[] = [];

  events.forEach((event) => {
    const date = new Date(event.date);
    if (date >= now) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });

  return { upcoming, past };
}

export function sortEvents(
  events: Event[],
  field: SortField,
  order: SortOrder = "asc"
): Event[] {
  const sorted = [...events].sort((a, b) => {
    if (field === "date") {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return da - db;
    }

    return a.name.localeCompare(b.name, "pt-BR");
  });

  if (order === "desc") {
    return sorted.reverse();
  }

  return sorted;
}
//vhaa Para melhorar a legibilidade, criei esse utils responsavel por separar eventos passados e futuros e por ordená-los por data ou nome