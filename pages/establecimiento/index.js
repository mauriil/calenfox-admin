import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormEstablecimiento from '../../components/establecimiento/Form';

export default function Establecimiento() {

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
        <FormEstablecimiento />
      </Box>
    </Container>
  );
}
