import React, { use } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Fade, Avatar, MenuItem, Select, FormControl, InputLabel, CardHeader } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ListCalendario = () => {
    const router = useRouter();
    const [calendars, setCalendars] = React.useState([
        {
            id: 1,
            name: 'Calendario 1',
            description: 'Calendario de prueba',
            price: 100,
            interval: 30,
            availability: [
                { weekDay: 'Lunes', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Martes', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Miércoles', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Jueves', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Viernes', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Sábado', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Domingo', times: [{openHour: '08:00', closeHour: '18:00'}] },
            ],
            style: { primaryColor: '#FC5600', backgroundColor1: '#ffffff', backgroundColor2: '#ffffff' },
        },
        {
            id: 2,
            name: 'Calendario 2',
            description: 'Calendario de prueba',
            price: 200,
            interval: 15,
            availability: [
                { weekDay: 'Lunes', times: [{openHour: '08:00', closeHour: '12:00'}, {openHour: '08:00', closeHour: '20:00'} ]},
                { weekDay: 'Martes', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Miércoles', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Jueves', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Viernes', times: [{openHour: '08:00', closeHour: '18:00'}] },
                { weekDay: 'Sábado', times: [] },
                { weekDay: 'Domingo', times: [] },
            ],
            style: { primaryColor: '#6A006A', backgroundColor1: '#ffffff', backgroundColor2: '#ffffff' },
        }]);


    const handleCalendarEdit = (calendarId) => {
        router.push(`/calendarios/${calendarId}`);
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
                        width: 400,
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
                                                xs: -100,
                                                sm: -100,
                                                md: -110,
                                            },
                                            zIndex: 1,
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                                        <Typography variant="h5">
                                            Calendarios
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box mb={2}>
                                    {calendars.map((calendar, index) => (
                                        <div onClick={() => handleCalendarEdit(calendar.id)} key={index}>
                                        <Card key={index} variant="outlined" sx={{ mb: 2, width: '350px', borderRadius: 8, cursor: 'pointer' }}>
                                            <CardHeader title={calendar.name} sx={{ textAlign: 'center', backgroundColor: calendar.style.primaryColor, color: 'primary.contrastText', borderRadius: '8px 8px 0 0', }} />

                                            <CardContent>
                                                <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
                                                    {calendar.description}
                                                </Typography>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <AttachMoneyIcon sx={{ mr: 1 }} /> {calendar.price}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <AccessTimeIcon sx={{ mr: 1 }} /> {calendar.interval}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                                    {calendar.availability.map((availabilityObj, index) => (
                                                        availabilityObj.times.length > 0 &&
                                                        <span key={index} style={{ color: calendar.style.primaryColor, marginRight: 5 }}>
                                                            {availabilityObj.weekDay[0]}{availabilityObj.weekDay[1]}{' '}
                                                        </span>
                                                    ))}
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
                                onClick={() => router.push('/calendarios/nuevo')}
                                startIcon={<CalendarMonthIcon />}
                                sx={{ mt: 2, borderRadius: 2 }}
                            >
                                Agregar Calendario
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </Fade>
        </Box>
    );
};

export default ListCalendario;
