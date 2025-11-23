// app/admin/page.tsx
'use client';

import { Typography, Container } from '@mui/material';

export default function AdminDashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <p>Aqui o admin vai gerenciar eventos (listar, criar, editar, excluir)...</p>
    </Container>
  );
}