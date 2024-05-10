import React from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Fade, Avatar, MenuItem, Select, FormControl, InputLabel, Tooltip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ConfirmationModal from '../common/ConfirmationModal';

const FormEstablecimiento = () => {
    const router = useRouter();
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = React.useState(false);
    const [dirtyForm, setDirtyForm] = React.useState(false);
    const [establecimiento, setEstablecimiento] = React.useState({
        logo: '',
        alias: '',
        name: '',
        specialty: '',
        location: '',
    });

    const handleSave = () => {
        setFormSubmitted(true);
        if (!establecimiento.name || !establecimiento.specialty || !establecimiento.location || !establecimiento.alias) {
            return;
        }
        router.push('/dashboard');
    };

    const handleFileChange = (event) => {
        setDirtyForm(true);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setEstablecimiento({ ...establecimiento, logo: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (event) => {
        setDirtyForm(true);
        const { id, value } = event.target;
        setEstablecimiento({ ...establecimiento, [id]: value });
    };

    const handleSpecialtyChange = (event) => {
        setDirtyForm(true);
        setEstablecimiento({ ...establecimiento, specialty: event.target.value });
    }

    const handleBack = () => {
        if (dirtyForm) {
            setConfirmationModalOpen(true);
            return;
        }
        router.back();
    }

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
                        maxWidth: 600,
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
                                                md: -180,
                                            },
                                            zIndex: 1,
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                        <Typography variant="h5">
                                            Establecimiento
                                        </Typography>
                                        <Tooltip title="Información adicional">
                                            <HelpOutlineIcon sx={{ ml: 1, color: 'grey' }} />
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Avatar src={establecimiento.logo} sx={{ width: 100, height: 100, marginBottom: 2 }} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    id="upload-logo"
                                />
                                <label htmlFor="upload-logo">
                                    <Button variant="outlined" component="span">
                                        Cambiar Logo
                                    </Button>
                                </label>
                                <TextField
                                    id="name"
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    color='secondary'
                                    value={establecimiento.name}
                                    onChange={handleChange}
                                    error={formSubmitted && !establecimiento.name}
                                    helperText={formSubmitted && !establecimiento.name && 'Este campo es requerido'}
                                />
                                <FormControl variant="outlined" fullWidth margin="normal">
                                    <InputLabel id="specialty" color='secondary'>Especialidad</InputLabel>
                                    <Select
                                        labelId="specialty"
                                        id="specialty"
                                        value={establecimiento.specialty}
                                        onChange={handleSpecialtyChange}
                                        label="Especialidad"
                                        color='secondary'
                                        error={formSubmitted && !establecimiento.specialty}
                                    >
                                        <MenuItem value="Odonntologia">Odonntologia</MenuItem>
                                        <MenuItem value="Óptica">Óptica</MenuItem>
                                        <MenuItem value="Peluquería">Peluquería</MenuItem>
                                        {/* Agregar más opciones según sea necesario */}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="location"
                                    label="Ubicación"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    color='secondary'
                                    value={establecimiento.location}
                                    onChange={handleChange}
                                    error={formSubmitted && !establecimiento.location}
                                    helperText={formSubmitted && !establecimiento.location && 'Este campo es requerido'}
                                />
                                <Box sx={{ width: '100%', height: 200, backgroundColor: 'gray', borderRadius: 4, marginBottom: 2 }} />
                                <TextField
                                    id="alias"
                                    label="Alias"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    color='secondary'
                                    value={establecimiento.alias}
                                    onChange={handleChange}
                                    error={formSubmitted && !establecimiento.alias}
                                    helperText={formSubmitted && !establecimiento.alias && 'Este campo es requerido'}
                                />
                                <Typography variant="caption" color="textSecondary">
                                    Este alias será el que se usará para acceder a tu establecimiento, por ejemplo:
                                    <Typography variant="caption" color="secondary" component="span"> https://fox.com/alias </Typography>
                                </Typography>
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

export default FormEstablecimiento;
