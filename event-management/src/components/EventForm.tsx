"use client";

import { useState, FormEvent } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import type { Event, EventCategory } from "@/services/eventsService";

interface EventFormProps {
  initialEvent?: Event;
  onSubmit: (event: Event) => void;
  onCancel?: () => void;
  showTitle?: boolean;
}

const categories: EventCategory[] = [
  "Conferência",
  "Workshop",
  "Webinar",
  "Networking",
  "Outro",
];

interface FormState {
  name: string;
  date: string;
  location: string;
  description: string;
  category: EventCategory;
}

export function EventForm({
  initialEvent,
  onSubmit,
  onCancel,
  showTitle = true,
}: EventFormProps) {
  const [form, setForm] = useState<FormState>(() => {
    if (initialEvent) {
      return {
        name: initialEvent.name,
        date: initialEvent.date,
        location: initialEvent.location,
        description: initialEvent.description,
        category: initialEvent.category,
      };
    }

    return {
      name: "",
      date: "",
      location: "",
      description: "",
      category: "Conferência",
    };
  });

  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.date ||
      !form.location ||
      !form.description ||
      !form.category
    ) {
      setErrors("Todos os campos são obrigatórios.");
      return;
    }

    if (form.description.length < 50) {
      setErrors("A descrição deve ter pelo menos 50 caracteres.");
      return;
    }

    if (new Date(form.date) <= new Date()) {
      setErrors("A data deve ser futura.");
      return;
    }

    setErrors(null);

    const eventData: Event = {
      id: initialEvent?.id,
      ...form,
      category: form.category,
    };

    onSubmit(eventData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
    >
      {showTitle && (
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          {initialEvent ? "Editar evento" : "Criar novo evento"}
        </Typography>
      )}

      {errors && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errors}
        </Typography>
      )}

      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <TextField
        label="Data e hora"
        type="datetime-local"
        fullWidth
        margin="normal"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        required
      />

      <TextField
        label="Local"
        fullWidth
        margin="normal"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        required
      />

      <TextField
        label="Descrição"
        fullWidth
        margin="normal"
        multiline
        minRows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <TextField
        select
        label="Categoria"
        fullWidth
        margin="normal"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value as EventCategory })
        }
        required
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mt: 2,
        }}
      >
        <Button type="submit" variant="contained">
          {initialEvent ? "Salvar alterações" : "Criar evento"}
        </Button>
        {onCancel && (
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </Box>
    </Box>
  );
}
