import React, { use, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Fade, Avatar, MenuItem, Select, FormControl, InputLabel, Tooltip, useMediaQuery } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TrashIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../common/ConfirmationModal';

const FormIntegracionGoogleCalendar = ({ googleCalendarId }) => {
    const router = useRouter();
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = React.useState(false);
    const [confirmationModalOptions, setConfirmationModalOptions] = React.useState({
        title: '',
        bodyText: '',
        disagreeText: '',
        agreeText: '',
        onAgree: () => { },
    });
    const [googleCalendarData, setGoogleCalendarData] = React.useState({
        descriptiveName: '',
        privateToken: '',
        publicToken: '',
    });

    const handleSave = () => {
        setFormSubmitted(true);
        if (!googleCalendarData.title || !googleCalendarData.reason || !googleCalendarData.description) {
            return;
        }
        router.push('/dashboard');
    };

    const fetchGoogleCalendarDataData = async (googleCalendarId) => {
        // Fetch data from API
    }

    useEffect(() => {
        if (googleCalendarId) {
            void fetchGoogleCalendarDataData(googleCalendarId);
        }
    }, [googleCalendarId]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setGoogleCalendarData({ ...googleCalendarData, [id]: value });
    };

    const handleDelete = () => {
        setConfirmationModalOpen(true);
        setConfirmationModalOptions({
            title: 'Eliminar Integración Google Calendar',
            bodyText: '¿Está seguro que desea eliminar esta integración de Google Calendar?',
            disagreeText: 'Cancelar',
            agreeText: 'Eliminar',
            onAgree: () => {
                console.log('Delete'); // TODO: Implement delete
                setConfirmationModalOpen(false);
            },
        });
    }

    const handleBack = () => {
        router.back();
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
                        width: {
                            xs: 380,
                            sm: 400,
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
                                                xs: -60,
                                                sm: -60,
                                                md: -100,
                                            },
                                            zIndex: 1,
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                        <Typography variant="h5">
                                            Google Calendar
                                        </Typography>
                                        <Tooltip title="Información adicional">
                                            <HelpOutlineIcon sx={{ ml: 1, color: 'grey' }} />
                                        </Tooltip>
                                    </Box>
                                </Box>

                                <TextField
                                    id='descriptiveName'
                                    label="Nombre descriptivo"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={googleCalendarData.descriptiveName}
                                    onChange={handleChange}
                                    error={formSubmitted && !googleCalendarData.descriptiveName}
                                    helperText={formSubmitted && !googleCalendarData.descriptiveName && 'Campo requerido'}
                                />

                                <Button
                                    variant="outlined"
                                    color="error"
                                    fullWidth
                                    onClick={handleDelete}
                                    sx={{ mt: 2 }}
                                >
                                    <TrashIcon />
                                    Eliminar
                                </Button>
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

export default FormIntegracionGoogleCalendar;
