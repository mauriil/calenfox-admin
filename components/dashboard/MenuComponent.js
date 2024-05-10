import React from 'react';
import { Card, CardContent, Button, Divider, Typography, Box, Fade } from '@mui/material';
import { useRouter } from 'next/router';

const MenuComponent = () => {
    const router = useRouter();

    return (
        <Card variant="outlined" sx={{
            borderRadius: 4,
            boxShadow: '15px 25px 15px rgba(0, 0, 0, 0.1)',
            maxWidth: 400,
            margin: 'auto',
            textAlign: 'center',
        }}>
            <CardContent>
                <Fade in={true} timeout={800}>
                    <div>
                        <Box mb={2}>
                            <img src='https://i.pinimg.com/originals/f9/61/4e/f9614e582b04f7927c86291eda26e0b2.jpg' alt="Logo" width="50" height="50" />
                        </Box>

                        <Box mt={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => {router.push('establecimiento')}} >Establecimiento</Button>
                        </Box>
                        <Box mt={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => {router.push('calendarios')}} >Calendarios</Button>
                        </Box>
                        <Box mt={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => {router.push('agenda')}}>Ver agendas de reservas</Button>
                        </Box>
                        <Box mt={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => {router.push('integracion')}}>Integración con MercadoLibre</Button>
                        </Box>
                        <Box mt={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => {router.push('ayuda')}}>Solicitar ayuda</Button>
                        </Box>
                        <Box mt={7}>
                            <Button variant="outlined" color="secondary" fullWidth >Cerrar sesión</Button>
                        </Box>
                    </div>
                </Fade>
            </CardContent>
        </Card>
    );
};

export default MenuComponent;
