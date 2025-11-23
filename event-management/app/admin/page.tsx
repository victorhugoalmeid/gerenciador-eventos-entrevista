// app/admin/page.tsx
"use client";

import { Container, Typography } from "@mui/material";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Painel do Administrador
        </Typography>
        <Typography variant="body1">
          Aqui o administrador poderá criar, editar, excluir e visualizar eventos.
        </Typography>
      </Container>
    </ProtectedRoute>
  );
}