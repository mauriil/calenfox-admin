import { useRouter } from 'next/router';
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormCalendario from '../../components/calendarios/Form';

export default function Calendarios() {
    const router = useRouter();
    const { calendarId } = router.query;

    return (
        <Container sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
            <Box sx={{
                maxHeight: '100vh',
            }}>
                <FormCalendario calendarId={calendarId} />
            </Box>
        </Container>
    );
}
