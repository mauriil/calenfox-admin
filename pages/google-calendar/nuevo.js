import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormIntegracionGoogleCalendar from '../../components/googleCalendars/Form';

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

        <FormIntegracionGoogleCalendar/>

      </Box>
    </Container>
  );
}
