import eventsReducer, {
  loadEvents,
  addEvent,
  editEvent,
  removeEvent,
} from "@/features/events/eventsSlice";
import type { Event } from "@/services/eventsService";

describe("eventsSlice", () => {
  const initialState = {
    items: [],
    loading: false,
    error: null as string | null,
  };

  const mockEvents: Event[] = [
    {
      id: 1,
      name: "Evento A",
      date: "2030-01-01T10:00",
      location: "Local X",
      description: "Descrição muito grande para passar no teste 123",
      category: "Conferência",
    },
    {
      id: 2,
      name: "Evento B",
      date: "2031-01-01T14:00",
      location: "Local Y",
      description: "Descrição muito grande para passar no teste 456",
      category: "Workshop",
    },
  ];

  it("deve preencher eventos (loadEvents.fulfilled)", () => {
    const result = eventsReducer(
      initialState,
      loadEvents.fulfilled(mockEvents, "", undefined)
    );

    expect(result.items.length).toBe(2);
    expect(result.items[0].name).toBe("Evento A");
  });

  it("deve adicionar um evento (addEvent.fulfilled)", () => {
    const newEvent: Event = {
      id: 3,
      name: "Evento C",
      date: "2032-01-01T14:00",
      location: "Local Z",
      description: "Descrição muito grande para passar no teste",
      category: "Outro",
    };

    const result = eventsReducer(
      { ...initialState, items: [...mockEvents] },
      addEvent.fulfilled(newEvent, "", newEvent)
    );

    expect(result.items.length).toBe(3);
    expect(result.items[2].name).toBe("Evento C");
  });

  it("deve editar um evento (editEvent.fulfilled)", () => {
    const updatedEvent: Event = {
      ...mockEvents[0],
      name: "Evento A Editado",
    };

    const result = eventsReducer(
      { ...initialState, items: [...mockEvents] },
      editEvent.fulfilled(updatedEvent, "", updatedEvent)
    );

    expect(result.items[0].name).toBe("Evento A Editado");
  });

  it("deve remover um evento (removeEvent.fulfilled)", () => {
    const result = eventsReducer(
      { ...initialState, items: [...mockEvents] },
      removeEvent.fulfilled(1, "", 1)
    );

    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe(2);
  });
});
