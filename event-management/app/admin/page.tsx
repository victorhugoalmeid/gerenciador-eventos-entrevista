// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  loadEvents,
  addEvent,
  editEvent,
  removeEvent,
} from "@/features/events/eventsSlice";
import { Event } from "@/services/eventsService";
import { EventForm } from "@/components/EventForm";

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.events);

  const [editingEvent, setEditingEvent] = useState<Event | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const handleCreateOrUpdate = async (event: Event) => {
    if (event.id) {
      await dispatch(editEvent(event));
    } else {
      await dispatch(addEvent(event));
    }
    setEditingEvent(undefined);
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
  };

  const handleDeleteClick = async (id?: number) => {
    if (!id) return;
    await dispatch(removeEvent(id));
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6, px: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Painel do Administrador
        </Typography>

        <Paper sx={{ p: 2, mb: 4 }}>
          <EventForm
            key={editingEvent?.id ?? "new"}
            initialEvent={editingEvent}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setEditingEvent(undefined)}
          />
        </Paper>

        <Typography variant="h6" gutterBottom>
          Eventos cadastrados
        </Typography>

        {loading ? (
          <Typography>Carregando eventos...</Typography>
        ) : items.length === 0 ? (
          <Typography>Nenhum evento cadastrado ainda.</Typography>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Local</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>
                      {new Date(event.date).toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="editar"
                        onClick={() => handleEditClick(event)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="excluir"
                        onClick={() => handleDeleteClick(event.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
    </ProtectedRoute>
  );
}
//vhaa Ao invés de usar useEffect para sincronizar props com state 
//que o próprio React hoje desincentiva e mostra um warnning 
//No painel do admin, integrei o formulário de criação/edição com o Redux. Ao clicar em editar, o formulário é preenchido com o evento atual
//Ao salvar, decido se é create ou update baseado na presença de id. A listagem é carregada via thunk loadEvents, e delete chama o thunk removeEvent