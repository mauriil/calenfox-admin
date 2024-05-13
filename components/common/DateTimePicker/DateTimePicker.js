import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const DateTimePicker = ({ value, calendarAvailability, onChange }) => {
    const [dayTimeSelected, setDayTimeSelected] = React.useState(new Date());
    const [hourAndMinute, setHourAndMinute] = React.useState('08:00');
    const [hoursAvailable, setHoursAvailable] = React.useState([]);

    const onDayChange = (value) => {
        setDayTimeSelected(value);
        onChange(value);
        const dateString = value.toISOString().split('T')[0];
        const filteredAvailability = calendarAvailability.reduce((acc, availability) => {
            if (availability.startsWith(dateString)) {
                acc.push(availability.split(' ')[1]);
            }
            return acc;
        }, []);
        setHoursAvailable(filteredAvailability);
    }

    const handleIntervalChange = (event) => {
        const newDateTime = new Date(dayTimeSelected);
        setHourAndMinute(event.target.value);
        const [hour, minute] = event.target.value.split(':');
        newDateTime.setHours(hour);
        newDateTime.setMinutes(minute);
        onChange(newDateTime);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Calendar
                onChange={onDayChange}
                value={value}
                minDate={new Date()}
                tileDisabled={({ date }) => {
                    const dateString = date.toISOString().split('T')[0];

                    const isDisabled = !calendarAvailability.some(availability => availability.startsWith(dateString));
                    return isDisabled;
                }}
            />

            <FormControl variant="outlined" fullWidth sx={{ my: 2 }}>
                <InputLabel id="horario">Horario</InputLabel>
                <Select
                    labelId="horario"
                    id="horario"
                    value={hourAndMinute}
                    onChange={handleIntervalChange}
                    label="Horario"
                >
                    {hoursAvailable.map((hour, index) => (
                        <MenuItem key={index} value={hour}>{`${hour}`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default DateTimePicker;
