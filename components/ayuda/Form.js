import React from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Fade, Avatar, MenuItem, Select, FormControl, InputLabel, Tooltip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const FormAyuda = () => {
    const router = useRouter();
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [supportTicket, setSupportTicket] = React.useState({
        title: '',
        reason: 'techDoubt',
        description: '',
        image: '',
    });

    const handleSave = () => {
        setFormSubmitted(true);
        if (!supportTicket.title || !supportTicket.reason || !supportTicket.description) {
            return;
        }
        router.push('/dashboard');
    };


    const handleChange = (event) => {
        const { id, value } = event.target;
        setSupportTicket({ ...supportTicket, [id]: value });
    };

    const handleReasonChange = (event) => {
        setSupportTicket({ ...supportTicket, reason: event.target.value });
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSupportTicket({ ...supportTicket, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleBack = () => {
        router.back();
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
                            sm: 390,
                            md: 600,
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
                                                xs: -80,
                                                sm: -80,
                                                md: -180,
                                            },
                                            zIndex: 1,
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                        <Typography variant="h5">
                                            Mesa de ayuda
                                        </Typography>
                                        <Tooltip title="Información adicional">
                                            <HelpOutlineIcon sx={{ ml: 1, color: 'grey' }} />
                                        </Tooltip>
                                    </Box>
                                </Box>

                                <TextField
                                    id="title"
                                    label="Título"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={supportTicket.title}
                                    onChange={handleChange}
                                    error={formSubmitted && !supportTicket.title}
                                    helperText={formSubmitted && !supportTicket.title && 'Este campo es requerido'}
                                />
                                <FormControl variant="outlined" fullWidth margin="normal">
                                    <InputLabel id="reason">Motivo</InputLabel>
                                    <Select
                                        labelId="reason"
                                        id="reason"
                                        value={supportTicket.reason}
                                        onChange={handleReasonChange}
                                        label="Motivo"
                                        error={formSubmitted && !supportTicket.reason}
                                    >
                                        <MenuItem value="serviceProviderProblem">No puedo crear/editar mi establecimiento</MenuItem>
                                        <MenuItem value="calendarProblem">No puedo crear/editar mis calendarios</MenuItem>
                                        <MenuItem value="mercadoPagoProblem">Problemas con integración de MercadoPago</MenuItem>
                                        <MenuItem value="techDoubt">Consulta técnica</MenuItem>
                                        <MenuItem value="other">Otro</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="description"
                                    label="Descripción"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    rows={4}
                                    multiline
                                    value={supportTicket.description}
                                    onChange={handleChange}
                                    error={formSubmitted && !supportTicket.description}
                                    helperText={formSubmitted && !supportTicket.description && 'Este campo es requerido'}
                                />
                                {supportTicket.image && (
                                    <img src={supportTicket.image} style={{ width: 200, height: 200, objectFit: 'cover', marginBottom: 2 }} />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    id="upload-image"
                                />
                                <Box display="flex" justifyContent="space-between">
                                <label htmlFor="upload-image">
                                    <Button variant="outlined" onClick={() => document.getElementById('upload-image').click()}>
                                        {supportTicket.image ? 'Cambiar imagen' : 'Subir imagen'}
                                    </Button>
                                </label>
                                {supportTicket.image && (
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        sx={{ ml: 2 }}
                                        onClick={() => setSupportTicket({ ...supportTicket, image: '' })}
                                    >
                                        Eliminar imagen
                                    </Button>
                                )}
                                </Box>
                            </Box>
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

export default FormAyuda;
