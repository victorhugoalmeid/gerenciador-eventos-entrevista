// app/events/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadEvents } from "@/features/events/eventsSlice";
import { Event, EventCategory } from "@/services/eventsService";
import {
  splitEventsByDate,
  sortEvents,
  SortField,
  SortOrder,
} from "@/utils/eventsUtils";

export default function EventsListPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.events);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | "all">(
    "all"
  );
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const filteredAndSorted = useMemo(() => {
    let events: Event[] = items;

    // filtro por texto (nome, local ou descrição)
    if (search.trim()) {
      const q = search.toLowerCase();
      events = events.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    // filtro por categoria
    if (categoryFilter !== "all") {
      events = events.filter((e) => e.category === categoryFilter);
    }

    // ordenação
    events = sortEvents(events, sortField, sortOrder);

    return events;
  }, [items, search, categoryFilter, sortField, sortOrder]);

  const { upcoming, past } = useMemo(
    () => splitEventsByDate(filteredAndSorted),
    [filteredAndSorted]
  );

  const renderTable = (events: Event[]) => {
    if (events.length === 0) {
      return <Typography>Nenhum evento encontrado.</Typography>;
    }

    return (
      <Paper sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  {new Date(event.date).toLocaleString("pt-BR")}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "reader"]}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6, px: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Eventos
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 200px 180px 160px" },
            gap: 2,
            mt: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Buscar por nome, local ou descrição"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            label="Categoria"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as EventCategory | "all")
            }
            sx={{ minWidth: { xs: "100%", md: 200 } }}
          >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="Conferência">Conferência</MenuItem>
            <MenuItem value="Workshop">Workshop</MenuItem>
            <MenuItem value="Webinar">Webinar</MenuItem>
            <MenuItem value="Networking">Networking</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </TextField>

          <TextField
            select
            label="Ordenar por"
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            sx={{ minWidth: { xs: "100%", md: 180 } }}
          >
            <MenuItem value="date">Data</MenuItem>
            <MenuItem value="name">Nome</MenuItem>
          </TextField>

          <TextField
            select
            label="Ordem"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            sx={{ minWidth: { xs: "100%", md: 160 } }}
          >
            <MenuItem value="asc">Crescente</MenuItem>
            <MenuItem value="desc">Decrescente</MenuItem>
          </TextField>
        </Box>

        {loading ? (
          <Typography>Carregando eventos...</Typography>
        ) : (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Próximos eventos
            </Typography>
            {renderTable(upcoming)}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6">Eventos passados</Typography>
            {renderTable(past)}
          </>
        )}
      </Container>
    </ProtectedRoute>
  );
}
