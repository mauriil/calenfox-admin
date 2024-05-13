import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ListCalendario from '../../components/calendarios/List';

export default function Calendarios() {

  return (
    <Container sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box>
        <ListCalendario />
      </Box>
    </Container>
  );
}
