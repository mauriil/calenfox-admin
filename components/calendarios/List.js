import React, { use } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Fade, Avatar, MenuItem, Select, FormControl, InputLabel, CardHeader, Switch } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationModal from '../common/ConfirmationModal';

const ListCalendario = () => {
    const router = useRouter();
    const [confirmationModalOpen, setConfirmationModalOpen] = React.useState(false);
    const [confirmationModalOptions, setConfirmationModalOptions] = React.useState({
        title: '',
        bodyText: '',
        disagreeText: '',
        agreeText: '',
        onAgree: () => { },
    });
    const [calendars, setCalendars] = React.useState([
        {
            id: 1,
            name: 'Calendario 1',
            description: 'Calendario de prueba',
            price: 100,
            interval: 30,
            availability: [
                { weekDay: 'Lunes', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Martes', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Miércoles', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Jueves', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Viernes', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Sábado', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Domingo', times: [{ openHour: '08:00', closeHour: '18:00' }] },
            ],
            style: { primaryColor: '#FC5600', backgroundColor1: '#ffffff', backgroundColor2: '#ffffff' },
            isActive: true,
        },
        {
            id: 2,
            name: 'Calendario 2',
            description: 'Calendario de prueba',
            price: 200,
            interval: 15,
            availability: [
                { weekDay: 'Lunes', times: [{ openHour: '08:00', closeHour: '12:00' }, { openHour: '08:00', closeHour: '20:00' }] },
                { weekDay: 'Martes', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Miércoles', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Jueves', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Viernes', times: [{ openHour: '08:00', closeHour: '18:00' }] },
                { weekDay: 'Sábado', times: [] },
                { weekDay: 'Domingo', times: [] },
            ],
            style: { primaryColor: '#6A006A', backgroundColor1: '#ffffff', backgroundColor2: '#ffffff' },
            isActive: false,
        }]);

    const updateCalendarActivation = (calendarId) => {
        const updatedCalendars = calendars.map(calendar => {
            if (calendar.id === calendarId) {
                calendar.isActive = !calendar.isActive;
            }
            return calendar;
        });
        setCalendars(updatedCalendars);
    };

    const handleCalendarActivation = (calendarId) => {
        const calendar = calendars.find(calendar => calendar.id === calendarId);
        if (calendar.isActive) {
            setConfirmationModalOptions({
                title: 'Desactivar calendario',
                bodyText: '¿Está seguro que desea desactivar este calendario?',
                disagreeText: 'Cancelar',
                agreeText: 'Desactivar',
                onAgree: () => {
                    updateCalendarActivation(calendarId);
                    setConfirmationModalOpen(false);
                }
            });
            setConfirmationModalOpen(true);
            return;
        } else {
            updateCalendarActivation(calendarId);
        }
    };
    const inactiveCalendarClass = (isActive) => isActive ? '' : 'inactive-calendar';

    const handleCalendarEdit = (calendarId) => {
        const calendar = calendars.find(calendar => calendar.id === calendarId);
        if (!calendar.isActive) {
            setConfirmationModalOptions({
                title: 'Calendario inactivo',
                bodyText: 'Este calendario se encuentra inactivo, ¿desea activarlo?',
                disagreeText: 'Cancelar',
                agreeText: 'Activar',
                onAgree: () => {
                    handleCalendarActivation(calendarId);
                    setConfirmationModalOpen(false);
                }
            });
            setConfirmationModalOpen(true);
            return;
        }
        router.push(`/calendarios/${calendarId}`);
    }
    const handleBack = () => {
        router.push('/dashboard');
    }

    return (
        <Box mt={6} display="flex" justifyContent="center">

            <ConfirmationModal
                open={confirmationModalOpen}
                handleClose={() => setConfirmationModalOpen(false)}
                title={confirmationModalOptions.title}
                bodyText={confirmationModalOptions.bodyText}
                disagreeText={confirmationModalOptions.disagreeText || 'Cancelar'}
                agreeText={confirmationModalOptions.agreeText}
                onDisagree={() => setConfirmationModalOpen(false)}
                onAgree={confirmationModalOptions.onAgree}
            />

            <Fade in={true} timeout={800}>
                <div>

                    <Card variant="outlined" sx={{
                        borderRadius: 4,
                        boxShadow: '15px 25px 15px rgba(0, 0, 0, 0.1)',
                        width: 380,
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

                                        <Card
                                            key={index}
                                            variant="outlined"
                                            sx={{
                                                mb: 2,
                                                width: '350px',
                                                borderRadius: 8,
                                                cursor: 'pointer',
                                                '&.inactive-calendar': { opacity: 0.5 }
                                            }}
                                            className={inactiveCalendarClass(calendar.isActive)}>
                                            <CardHeader
                                                title={calendar.name}
                                                sx={{
                                                    textAlign: 'center',
                                                    backgroundColor: calendar.style.primaryColor,
                                                    color: 'primary.contrastText',
                                                    borderRadius: '8px 8px 0 0',
                                                    maxHeight: 40,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }} />
                                            <div onClick={() => handleCalendarEdit(calendar.id)} key={index}>
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
                                            </div>
                                            <Box display="flex" alignItems="center" justifyContent="center">
                                                <Typography variant="body2" sx={{ mr: 1 }}>
                                                    {calendar.isActive ? 'Activo' : 'Inactivo'}
                                                </Typography>
                                                <Switch
                                                    checked={calendar.isActive}
                                                    onChange={() => handleCalendarActivation(calendar.id)}
                                                />
                                            </Box>
                                        </Card>

                                    ))}
                                </Box>


                            </Box>
                            <Button
                                variant="outlined"
                                color="secondary"
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
