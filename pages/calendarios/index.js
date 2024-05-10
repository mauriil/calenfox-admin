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
      width: '100%',
    }}>
      <Box sx={{
        overflowY: 'scroll',
        maxHeight: '100vh',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        width: '100%',
      }}>
        <ListCalendario />
      </Box>
    </Container>
  );
}
