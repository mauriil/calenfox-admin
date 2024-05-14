import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ListGoogleCalendars from '../../components/googleCalendars/List';

export default function Calendarios() {

  const reservations = []

  return (
    <Container sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      <Box>

        <ListGoogleCalendars/>

      </Box>
    </Container>
  );
}
