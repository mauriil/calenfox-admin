import React, { useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Fade, Avatar, MenuItem, Select, FormControl, InputLabel, InputAdornment, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { SliderPicker } from 'react-color';
import ConfirmationModal from '../common/ConfirmationModal';

const FormEstablecimiento = ({ calendarId }) => {

    const router = useRouter();
    const [confirmationModalOpen, setConfirmationModalOpen] = React.useState(false);
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [dirtyForm, setDirtyForm] = React.useState(false);
    const [calendar, setCalendar] = React.useState(
        {
            id: 0,
            name: '',
            description: '',
            price: 5000,
            interval: 15,
            availability: [
                { weekDay: 'Lunes', times: [] },
                { weekDay: 'Martes', times: [] },
                { weekDay: 'Miércoles', times: [] },
                { weekDay: 'Jueves', times: [] },
                { weekDay: 'Viernes', times: [] },
                { weekDay: 'Sábado', times: [] },
                { weekDay: 'Domingo', times: [] },
            ],
            style: { primaryColor: '', secondaryColor: '', },
            isPaymentRequired: false,
            mercadoLibreTokenId: '',
        });

    const getCalendar = async (calendarId) => {
        // Llamar a la API para obtener el calendario
        // const response = await fetch(`https://api.com/calendars/${calendarId}`);
        // const data = await response.json();
        // setCalendar(data);
    };

    const checkOverlap = (times) => {
        for (let i = 0; i < times.length - 1; i++) {
            for (let j = i + 1; j < times.length; j++) {
                const start1 = new Date(`2000-01-01T${times[i].openHour}`);
                const end1 = new Date(`2000-01-01T${times[i].closeHour}`);
                const start2 = new Date(`2000-01-01T${times[j].openHour}`);
                const end2 = new Date(`2000-01-01T${times[j].closeHour}`);

                if ((start1 < end2 && end1 > start2) || (start2 < end1 && end2 > start1)) {
                    return true; // Hay superposición
                }
            }
        }
        return false; // No hay superposición
    };


    useEffect(() => {
        if (calendarId) {
            getCalendar(calendarId);
        }
    }, [calendarId]);

    const handleSave = () => {
        setFormSubmitted(true);
        const requiredFields = ['name', 'description', 'price', 'interval'];
        const isValid = requiredFields.every(field => calendar[field]);
        if (!isValid) {
            return;
        }
        const hasOverlap = calendar.availability.some(day => checkOverlap(day.times));
        if (hasOverlap) {
            console.log('Hay superposición de horarios');
            return;
        }
        console.log(calendar);
        router.push('/calendarios');
    };


    const handleChange = (event) => {
        setDirtyForm(true);
        const { id, value } = event.target;
        setCalendar({ ...calendar, [id]: value });
        console.log(calendar);
    };

    const handleIsPaymentRequired = (event) => {
        setDirtyForm(true);
        setCalendar({ ...calendar, isPaymentRequired: event.target.checked });
    };

    const handleIntervalChange = (event) => {
        setDirtyForm(true);
        setCalendar({ ...calendar, interval: event.target.value });
    };

    const handleTokenMLChange = (event) => {
        setDirtyForm(true);
        setCalendar({ ...calendar, mercadoLibreTokenId: event.target.value });
    };

    const handleAddTime = (index) => {
        const updatedAvailability = [...calendar.availability];
        updatedAvailability[index].times.push({ openHour: '', closeHour: '' });
        setCalendar({ ...calendar, availability: updatedAvailability });
    };
    const handleRemoveTime = (dayIndex, timeIndex) => {
        const updatedAvailability = [...calendar.availability];
        updatedAvailability[dayIndex].times.splice(timeIndex, 1);
        setCalendar({ ...calendar, availability: updatedAvailability });
    };

    const handleTimeChange = (event, dayIndex, timeIndex, field) => {
        const value = event.target.value;
        const updatedAvailability = [...calendar.availability];
        updatedAvailability[dayIndex].times[timeIndex][field] = value;
        setCalendar({ ...calendar, availability: updatedAvailability });
    };


    const handleBack = () => {
        if (dirtyForm) {
            setConfirmationModalOpen(true);
            return;
        }
        router.back();
    }

    const handlePreview = () => {
        console.log('Vista previa');
    };

    return (
        <Box mt={6} display="flex" justifyContent="center">

            <ConfirmationModal
                open={confirmationModalOpen}
                handleClose={() => setConfirmationModalOpen(false)}
                title="¿Estás seguro de que deseas salir?"
                bodyText="Si sales ahora, perderás los cambios que hayas hecho."
                disagreeText="Cancelar"
                agreeText="Salir"
                onDisagree={() => setConfirmationModalOpen(false)}
                onAgree={() => router.back()}
            />

            <Fade in={true} timeout={800}>
                <div>

                    <Card variant="outlined" sx={{
                        borderRadius: 4,
                        boxShadow: '15px 25px 15px rgba(0, 0, 0, 0.1)',
                        mb: 5,
                        maxWidth: 600,
                        minWidth: {
                            xs: 400,
                            sm: 400,
                            md: 600,
                        },
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
                                                xs: -120,
                                                sm: -120,
                                                md: -220,
                                            },
                                            zIndex: 1,
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                        <Typography variant="h5">
                                            Calendario
                                        </Typography>
                                        <Tooltip title="Información adicional">
                                            <HelpOutlineIcon sx={{ ml: 1, color: 'grey' }} />
                                        </Tooltip>
                                    </Box>
                                </Box>


                                <TextField
                                    id="name"
                                    label="Nombre"
                                    value={calendar.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    color='secondary'
                                    error={formSubmitted && !calendar.name}
                                    helperText={(formSubmitted && !calendar.name) && "El nombre es requerido"}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    id="description"
                                    label="Descripción"
                                    value={calendar.description}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    color='secondary'
                                    rows={4}
                                    sx={{ mb: 2 }}
                                    error={formSubmitted && !calendar.description}
                                    helperText={(formSubmitted && !calendar.description) && "La descripción es requerida"}
                                />
                                <TextField
                                    id="price"
                                    label="Precio"
                                    value={calendar.price}
                                    color='secondary'
                                    onChange={handleChange}
                                    fullWidth
                                    type="number"
                                    inputProps={{ min: "10" }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    sx={{ mb: 2 }}
                                    error={formSubmitted && !calendar.price}
                                    helperText={(formSubmitted && !calendar.price) && "El precio es requerido"}
                                />
                                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="interval" color='secondary'>Intervalo</InputLabel>
                                    <Select
                                        labelId="interval"
                                        id="interval"
                                        value={calendar.interval}
                                        onChange={handleIntervalChange}
                                        color='secondary'
                                        label="Intervalo"
                                    >
                                        <MenuItem value={15}>15 minutos</MenuItem>
                                        <MenuItem value={30}>30 minutos</MenuItem>
                                        <MenuItem value={45}>45 minutos</MenuItem>
                                        <MenuItem value={60}>1 hora</MenuItem>
                                        <MenuItem value={90}>1 hora 30 minutos</MenuItem>
                                        <MenuItem value={120}>2 horas</MenuItem>
                                    </Select>
                                </FormControl>
                                {calendar.availability.map((day, dayIndex) => (
                                    <Box key={dayIndex} sx={{ mb: 3, width: '100%' }}>
                                        <Typography variant="h6" sx={{ mb: 1 }}>{day.weekDay}</Typography>
                                        {day.times.map((time, timeIndex) => (
                                            <Box key={timeIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <TextField
                                                    id={`openHour-${dayIndex}-${timeIndex}`}
                                                    label="Hora de apertura"
                                                    value={time.openHour}
                                                    onChange={(event) => handleTimeChange(event, dayIndex, timeIndex, 'openHour')}
                                                    fullWidth
                                                    type="time"
                                                    sx={{ mr: 1 }}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    id={`closeHour-${dayIndex}-${timeIndex}`}
                                                    label="Hora de cierre"
                                                    value={time.closeHour}
                                                    onChange={(event) => handleTimeChange(event, dayIndex, timeIndex, 'closeHour')}
                                                    fullWidth
                                                    type="time"
                                                    sx={{ mr: 1 }}
                                                    variant="outlined"
                                                />
                                                <IconButton onClick={() => handleRemoveTime(dayIndex, timeIndex)} aria-label="Eliminar">
                                                    <DeleteIcon color='secondary' />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        {checkOverlap(day.times) && (
                                            <Typography variant="body2" color="error">
                                                ¡Hay superposición de horarios!
                                            </Typography>
                                        )}
                                        <Button variant="outlined" fullWidth onClick={() => handleAddTime(dayIndex)} sx={{ mt: 1 }}>Agregar horario</Button>
                                    </Box>
                                ))}
                                <InputLabel id="primary-color-label" sx={{
                                    color: calendar.style.primaryColor,
                                    fontWeight: 'bold',
                                }}> Color primario</InputLabel>
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <SliderPicker
                                        color={calendar.style.primaryColor}
                                        onChange={(color) => setCalendar({ ...calendar, style: { ...calendar.style, primaryColor: color.hex } })}
                                    />
                                </FormControl>

                                <InputLabel id="secondary-color-label" sx={{
                                    color: calendar.style.secondaryColor,
                                    fontWeight: 'bold',
                                }}> Color secundario</InputLabel>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <SliderPicker
                                        color={calendar.style.secondaryColor}
                                        onChange={(color) => setCalendar({ ...calendar, style: { ...calendar.style, secondaryColor: color.hex } })}
                                    />
                                </FormControl>

                                {/* TODO: mostrar este check solo si hay tokens de MercadoLibre disponibles */}
                                <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={calendar.isPaymentRequired} onChange={handleIsPaymentRequired} name="isPaymentRequired" />}
                                        label="Requerir pago anticipado"
                                    />
                                </Box>
                                {calendar.isPaymentRequired && (
                                    <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                                        <InputLabel htmlFor="mercadoLibreTokenId" color='secondary'>Token MercadoLibre</InputLabel>
                                        <Select
                                            labelId="mercadoLibreTokenId"
                                            id="mercadoLibreTokenId"
                                            value={calendar.mercadoLibreTokenId}
                                            onChange={handleTokenMLChange}
                                            color='secondary'
                                            label="Token MercadoLibre"
                                        >
                                            <MenuItem value={15}>Token de Pepe </MenuItem>
                                            <MenuItem value={30}>Token de Juan</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}

                            </Box>
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onClick={handlePreview}
                                sx={{ mt: 2 }}
                            >
                                Vista Previa
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSave}
                                sx={{ mt: 2 }}
                            >
                                Guardar
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </Fade>
        </Box>
    );
};

export default FormEstablecimiento;
