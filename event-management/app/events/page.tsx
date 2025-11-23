// app/events/page.tsx
'use client';

import { Typography, Container } from '@mui/material';

export default function EventsListPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Events
      </Typography>
      <p>Aqui os leitores vão visualizar eventos (atuais e passados)...</p>
    </Container>
  );
}