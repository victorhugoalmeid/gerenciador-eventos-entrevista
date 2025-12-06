// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
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

  const now = new Date();
  const totalEvents = items.length;
  const upcomingCount = items.filter((e) => new Date(e.date) > now).length;
  const pastCount = totalEvents - upcomingCount;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
          <header className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-brand backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-indigo-200">Admin</p>
                <h1 className="text-3xl font-semibold leading-tight text-white">
                  Painel do Administrador
                </h1>
                <p className="text-slate-200/85">
                  Cadastre, edite e acompanhe eventos com visão rápida de status.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                  <p className="text-xs text-slate-200/70">Total</p>
                  <p className="text-xl font-semibold text-white">{totalEvents}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-emerald-500/15 px-4 py-3">
                  <p className="text-xs text-emerald-100/80">Próximos</p>
                  <p className="text-xl font-semibold text-emerald-100">{upcomingCount}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-amber-500/15 px-4 py-3">
                  <p className="text-xs text-amber-100/80">Passados</p>
                  <p className="text-xl font-semibold text-amber-100">{pastCount}</p>
                </div>
              </div>
            </div>
          </header>

          <section className="grid gap-6 rounded-3xl border border-slate-200/60 bg-white/95 p-6 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-indigo-600">Cadastro de eventos</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-slate-900">
                  {editingEvent ? "Editar evento" : "Criar novo evento"}
                </span>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                  Campos obrigatórios
                </span>
              </div>
              <p className="text-sm text-slate-600">
                A data deve ser futura e a descrição precisa de no mínimo 50 caracteres.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <EventForm
                key={editingEvent?.id ?? "new"}
                initialEvent={editingEvent}
                onSubmit={handleCreateOrUpdate}
                onCancel={() => setEditingEvent(undefined)}
                showTitle={false}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/60 bg-white/95 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-indigo-600">Eventos cadastrados</p>
                <p className="text-sm text-slate-600">
                  Clique em editar para ajustar um evento ou remover definitivamente.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="px-6 py-8 text-slate-700">Carregando eventos...</div>
            ) : items.length === 0 ? (
              <div className="px-6 py-8 text-slate-700">Nenhum evento cadastrado ainda.</div>
            ) : (
              <>
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm hidden md:block">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Nome
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Local
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Categoria
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-slate-800">
                        {items.map((event, idx) => (
                          <tr
                            key={event.id}
                            className={`transition hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                          >
                            <td className="px-6 py-3 text-sm font-semibold text-slate-900">
                              {event.name}
                            </td>
                            <td className="px-6 py-3 text-sm text-slate-700">
                              {new Date(event.date).toLocaleString("pt-BR")}
                            </td>
                            <td className="px-6 py-3 text-sm text-slate-700">
                              {event.location}
                            </td>
                            <td className="px-6 py-3 text-sm">
                              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                                {event.category}
                              </span>
                            </td>
                            <td className="px-6 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEditClick(event)}
                                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-200 transition hover:bg-indigo-100"
                                >
                                  <EditIcon fontSize="small" />
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteClick(event.id)}
                                  className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-100"
                                >
                                  <DeleteIcon fontSize="small" />
                                  Remover
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid gap-3 md:hidden">
                  {items.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-slate-900">{event.name}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(event.date).toLocaleString("pt-BR")}
                          </p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                          {event.category}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-slate-700">{event.location}</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(event)}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-200 transition hover:bg-indigo-100"
                        >
                          <EditIcon fontSize="small" />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(event.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-100"
                        >
                          <DeleteIcon fontSize="small" />
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
//vhaa Ao invés de usar useEffect para sincronizar props com state 
//que o próprio React hoje desincentiva e mostra um warnning 
//No painel do admin, integrei o formulário de criação/edição com o Redux. Ao clicar em editar, o formulário é preenchido com o evento atual
//Ao salvar, decido se é create ou update baseado na presença de id. A listagem é carregada via thunk loadEvents, e delete chama o thunk removeEvent
