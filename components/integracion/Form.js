import React, { use, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Fade, Avatar, MenuItem, Select, FormControl, InputLabel, Tooltip, useMediaQuery } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TrashIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../common/ConfirmationModal';

const FormIntegracionMercadoLibre = ({ mercadoLibreTokenId }) => {
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
    const [mercadoLibreToken, setMercadoLibreToken] = React.useState({
        descriptiveName: '',
        privateToken: '',
        publicToken: '',
    });

    const handleSave = () => {
        setFormSubmitted(true);
        if (!mercadoLibreToken.title || !mercadoLibreToken.reason || !mercadoLibreToken.description) {
            return;
        }
        router.push('/dashboard');
    };

    const fetchMercadoLibreTokenData = async (mercadoLibreTokenId) => {
        // Fetch data from API
    }

    useEffect(() => {
        if (mercadoLibreTokenId) {
            void fetchMercadoLibreTokenData(mercadoLibreTokenId);
        }
    }, [mercadoLibreTokenId]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setMercadoLibreToken({ ...mercadoLibreToken, [id]: value });
    };

    const handleBack = () => {
        router.back();
    }

    const handleDelete = () => {
        setConfirmationModalOpen(true);
        setConfirmationModalOptions({
            title: 'Eliminar Integración Mercado Libre',
            bodyText: '¿Está seguro que desea eliminar esta integración de Mercado Libre?',
            disagreeText: 'Cancelar',
            agreeText: 'Eliminar',
            onAgree: () => {
                console.log('Delete'); // TODO: Implement delete
                setConfirmationModalOpen(false);
            },
        });
    };

    const screenSize = useMediaQuery('(min-width:1000px)');

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
                                            Integración con {
                                                screenSize ? 'MercadoLibre' : 'ML'
                                            }
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
                                    value={mercadoLibreToken.descriptiveName}
                                    onChange={handleChange}
                                    error={formSubmitted && !mercadoLibreToken.descriptiveName}
                                    helperText={formSubmitted && !mercadoLibreToken.descriptiveName && 'Campo requerido'}
                                />
                                <TextField
                                    id='privateToken'
                                    label="Token privado"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={mercadoLibreToken.privateToken}
                                    onChange={handleChange}
                                    error={formSubmitted && !mercadoLibreToken.privateToken}
                                    helperText={formSubmitted && !mercadoLibreToken.privateToken && 'Campo requerido'}
                                />
                                <TextField
                                    id='publicToken'
                                    label="Token público"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={mercadoLibreToken.publicToken}
                                    onChange={handleChange}
                                    error={formSubmitted && !mercadoLibreToken.publicToken}
                                    helperText={formSubmitted && !mercadoLibreToken.publicToken && 'Campo requerido'}
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

export default FormIntegracionMercadoLibre;
