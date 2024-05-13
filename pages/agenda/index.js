import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import BigCalendar from '../../components/agenda/BigCalendar';
import { id } from 'date-fns/locale';

export default function Calendarios() {

  const reservations = [
    {
      id: 1,
      calendarId: {
        id: 1,
        name: 'Calendar 1'
      },
      googleCalendarId: 'google_calendar_1',
      serviceProviderId: 101,
      guestId: {
        id: 201,
        name: 'Guest 1'
      },
      startsAt: '2024-05-15T10:00:00',
      endsAt: '2024-05-15T12:00:00',
      status: 'confirmed',
      isPaymentRequired: true,
      paymentId: 'payment_1'
    },
    {
      id: 2,
      calendarId: {
        id: 2,
        name: 'Calendar 2'
      },
      googleCalendarId: 'google_calendar_2',
      serviceProviderId: 102,
      guestId: {
        id: 202,
        name: 'Guest 2'
      },
      startsAt: '2024-05-16T14:00:00',
      endsAt: '2024-05-16T16:00:00',
      status: 'clientPending',
      isPaymentRequired: false,
      paymentId: null
    },
    {
      id: 3,
      calendarId: {
        id: 1,
        name: 'Calendar 1'
      },
      googleCalendarId: 'google_calendar_1',
      serviceProviderId: 101,
      guestId: {
        id: 203,
        name: 'Guest 3'
      },
      startsAt: '2024-05-18T09:00:00',
      endsAt: '2024-05-18T11:00:00',
      status: 'cancelled',
      isPaymentRequired: true,
      paymentId: 'payment_2'
    }
  ];

  return (
    <Container sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      <Box>

        <BigCalendar reservations={reservations}/>

      </Box>
    </Container>
  );
}
