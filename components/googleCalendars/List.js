import React from 'react';
import { Card, CardContent, Button, Typography, Box, Fade, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

const ListGoogleCalendars = () => {
    const router = useRouter();
    const [googleCalendarIds, setGoogleCalendarIds] = React.useState([
        {
            id: 1,
            descriptiveName: 'Calendario de Juan',
            tokenId: 'private',
            dateAdded: '2021-10-10',
            calendarsUsed: 2,
        },
        {
            id: 2,
            descriptiveName: 'Calendario de Pedro',
            tokenId: 'private',
            dateAdded: '2021-10-10',
            calendarsUsed: 1,
        },
    ]);

    const handleGoogleCalendarIdEdit = (googleCalendarIdId) => {
        router.push(`/google-calendar/${googleCalendarIdId}`);
    }

    const handleNewGoogleCalendar = () => {
        console.log('New Google Calendar');
    }
    const handleBack = () => {
        router.push('/dashboard');
    }

    return (
        <Box mt={6} display="flex" justifyContent="center">
            <Fade in={true} timeout={800}>
                <div>
                    <Card variant="outlined" sx={{
                        borderRadius: 4,
                        boxShadow: '15px 25px 15px rgba(0, 0, 0, 0.1)',
                        width: {
                            xs: 380,
                            sm: 400,
                            md: 500,
                        },
                        mb: 5,
                    }}>
                        <CardContent>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Box position="relative" mb={2}>
                                    <IconButton
                                        onClick={() => handleBack()}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: {
                                                xs: -50,
                                                sm: -50,
                                                md: -50,
                                            },
                                            zIndex: 1,
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                                        <Typography variant="h5">
                                            Google Calendar
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box mb={2}>
                                    {googleCalendarIds.map((googleCalendarId, index) => (
                                        <div onClick={() => handleGoogleCalendarIdEdit(googleCalendarId.id)} key={index}>
                                            <Card key={index} variant="outlined" sx={{ mb: 2, width: '350px', cursor: 'pointer' }}>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                                                        {googleCalendarId.descriptiveName}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                                        Fecha de Agregación: {googleCalendarId.dateAdded}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                                        Usado en {googleCalendarId.calendarsUsed} calendarios
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => handleNewGoogleCalendar()}
                                sx={{ mt: 2, borderRadius: 2 }}
                            >
                                Agregar Google Calendar
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </Fade>
        </Box>
    );
};

export default ListGoogleCalendars;
