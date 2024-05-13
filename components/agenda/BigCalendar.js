import React, { useEffect } from 'react';
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, Card, CardContent, Fade, IconButton, useMediaQuery } from '@mui/material';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { addMinutes, set, startOfDay } from 'date-fns';
import EventDetailModal from '../common/EventDetailModal';

const locales = {
    'es-ES': es,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const BigCalendar = ({ reservations }) => {
    const router = useRouter();
    const [events, setEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    const handleBack = () => {
        router.push('/dashboard');
    }

    const formatEvents = (reservations) => {
        const events = reservations.map((reservation) => {
            return {
                // title: reservation.status === 'confirmed' ? 'Reservado' : 'Pendiente',
                reservationId: reservation.id,
                calendarId: reservation.calendarId.id,
                title: `${reservation.guestId.name} - ${reservation.calendarId.name}`,
                start: new Date(reservation.startsAt),
                end: new Date(reservation.endsAt),
                status: reservation.status,
            }
        });
        setEvents(events);
    }

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        void formatEvents(reservations);
    }, [reservations]);

    const screenSize = useMediaQuery('(min-width:1000px)');

    return (
        <Box mt={6} display="flex" justifyContent="center">
            <Fade in={true} timeout={800}>
                <div>

                    <Card variant="outlined" sx={{
                        borderRadius: 4,
                        boxShadow: '15px 25px 15px rgba(0, 0, 0, 0.1)',
                        width: {
                            xs: 380,
                            sm: 390,
                            md: 600,
                            lg: 800,
                            xl: 1000,
                        },
                        mb: 5,
                    }}>
                        <CardContent>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Button variant="contained" color="primary" size="small" startIcon={<ArrowBack />} onClick={() => handleBack()}>Volver</Button>
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    messages={{
                                        next: ">",
                                        previous: "<",
                                        today: "Hoy",
                                        month: "Mes",
                                        week: "Semana",
                                        day: "Día",
                                        agenda: "Agenda",
                                        date: "Fecha",
                                        time: "Hora",
                                        event: "Evento",
                                        noEventsInRange: "No hay eventos en este rango",
                                        showMore: (total) => `+ Ver más (${total})`,
                                        allDay: "Todo el día",
                                        tomorrow: "Mañana",
                                        work_week: "Semana laboral",
                                        yesterday: "Ayer",
                                    }}
                                    culture={"es-ES"}
                                    style={{
                                        height: "80vh",
                                        maxHeight: "700px",
                                        width: "100%",
                                        backgroundColor: "white",
                                        padding: "1rem",
                                        borderRadius: "1rem",
                                        gap: "1rem",
                                        fontSize: "1rem",
                                    }}
                                    formats={{
                                        monthHeaderFormat: (date, culture, localizer) => localizer.format(date, "MMMM", culture).charAt(0).toUpperCase() + localizer.format(date, "MMMM Y", culture).slice(1),
                                    }}
                                    eventPropGetter={(event) => ({
                                        style: {
                                            backgroundColor: event.status === 'confirmed' ? "#91B493" : event.status === 'clientPending' ? "#F2E3C6" : event.status === 'serviceProviderPending' ? "#4EB3D3" : "#FF7573",
                                            color: "black",
                                            borderColor: "black",
                                        },
                                    })}
                                    views={["month", "day", 'agenda']}
                                    onSelectEvent={handleEventClick}
                                />
                            </Box>
                        </CardContent>
                    </Card>

                    <EventDetailModal open={openModal} event={selectedEvent} onClose={handleCloseModal} />

                </div>
            </Fade>
        </Box>
    );
}

export default BigCalendar;
