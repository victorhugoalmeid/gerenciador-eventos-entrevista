// app/login/page.tsx
'use client';

import { Typography, Container } from '@mui/material';

export default function LoginPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login – Event Management
      </Typography>
      <p>Aqui entra o formulário de login (email, senha, botão Entrar)...</p>
    </Container>
  );
}