import React from 'react';
import { Card, CardContent, Button, Typography, Box, Fade, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

const ListMercadoLibreToken = () => {
    const router = useRouter();
    const [mercadoLibreTokens, setMercadoLibreTokens] = React.useState([
        {
            id: 1,
            descriptiveName: 'MercadoLibreToken 1',
            privateToken: 'private',
            publicToken: 'public',
            dateAdded: '10/05/2024', // Fecha de agregación
        },
        {
            id: 2,
            descriptiveName: 'MercadoLibreToken 2',
            privateToken: 'private',
            publicToken: 'public',
            dateAdded: '09/05/2024', // Fecha de agregación
        },
    ]);

    const handlemercadoLibreTokenEdit = (mercadoLibreTokenId) => {
        router.push(`/mercadoLibreTokens/${mercadoLibreTokenId}`);
    }
    const handleBack = () => {
        router.push('/dashboard');
    }

    return (
        <Box mt={6} display="flex" justifyContent="center">
            <Fade in={true} timeout={800}>
                <div>
                    <Card variant="outlined" sx={{
                        borderRadius: 4,
                        boxShadow: '15px 25px 15px rgba(0, 0, 0, 0.1)',
                        width: 400,
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
                                                xs: -50,
                                                sm: -50,
                                                md: -50,
                                            },
                                            zIndex: 1,
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                                        <Typography variant="h5">
                                            Tokens de MercadoLibre
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box mb={2}>
                                    {mercadoLibreTokens.map((mercadoLibreToken, index) => (
                                        <div onClick={() => handlemercadoLibreTokenEdit(mercadoLibreToken.id)} key={index}>
                                            <Card key={index} variant="outlined" sx={{ mb: 2, width: '350px', cursor: 'pointer' }}>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                                                        {mercadoLibreToken.descriptiveName}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                                        Fecha de Agregación: {mercadoLibreToken.dateAdded}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => router.push('/mercadoLibreToken/nuevo')}
                                sx={{ mt: 2, borderRadius: 2 }}
                            >
                                Agregar Token de MercadoLibre
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </Fade>
        </Box>
    );
};

export default ListMercadoLibreToken;
