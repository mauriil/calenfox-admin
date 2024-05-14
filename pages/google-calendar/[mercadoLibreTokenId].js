import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormIntegracionGoogleCalendar from '../../components/googleCalendars/Form';
import { useRouter } from 'next/router';

export default function Calendarios() {
  const router = useRouter();
  const { mercadoLibreTokenId } = router.query;

  return (
    <Container sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      <Box>

        <FormIntegracionGoogleCalendar mercadoLibreTokenId={mercadoLibreTokenId}/>

      </Box>
    </Container>
  );
}
