import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormCalendario from '../../components/calendarios/Form';

export default function Calendarios() {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxHeight: '100vh',
        }}
      >
        <FormCalendario />
      </Box>
    </Container>
  );
}
