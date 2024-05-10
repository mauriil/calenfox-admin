import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const DateTimePicker = ({ value, onChange }) => {
    const [dayTimeSelected, setDayTimeSelected] = React.useState(new Date());
    const [hourAndMinute, setHourAndMinute] = React.useState(null);

    const onDayChange = (value) => {
        setDayTimeSelected(value);
        onChange(value);
    }

    const handleIntervalChange = (event) => {
        setHourAndMinute(event.target.value);
        const hour = dayTimeSelected ? dayTimeSelected.getHours() : 0;
        const minute = dayTimeSelected ? dayTimeSelected.getMinutes() : 0;
        const newDateTime = new Date(dayTimeSelected);
        newDateTime.setHours(hour);
        newDateTime.setMinutes(minute);
        newDateTime.setSeconds(0);
        newDateTime.setMilliseconds(0);
        newDateTime.setMinutes(newDateTime.getMinutes() + event.target.value);
        onChange(newDateTime);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Calendar onChange={onDayChange} value={value} />
            <FormControl variant="outlined" fullWidth sx={{ my: 2 }}>
                <InputLabel id="horario" color='secondary'>Horario</InputLabel>
                <Select
                    labelId="horario"
                    id="horario"
                    value={hourAndMinute}
                    onChange={handleIntervalChange}
                    color='secondary'
                    label="Horario"
                >
                    <MenuItem value={15}>15:00</MenuItem>
                    <MenuItem value={30}>15:30</MenuItem>
                    <MenuItem value={45}>17:00</MenuItem>
                    <MenuItem value={60}>18:30</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default DateTimePicker;
