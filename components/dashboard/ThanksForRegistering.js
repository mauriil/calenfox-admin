import React from 'react';
import { Card, CardContent, Button, Divider, Typography, Box, Fade } from '@mui/material';

const ThankYou = ({ handleOk }) => {
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
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            ¡Gracias por registrarte en Fox!
                            <br />
                            Esta es una fase beta de nuestra aplicación. Si necesitas ayuda, contáctanos en support@fox.com.
                        </Typography>
                    </div>
                </Fade>
                <Divider style={{ margin: '20px 0' }} />
                <Box mt={2}>
                    <Button variant="outlined" color="primary" fullWidth onClick={handleOk}>Entiendo, continuar</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ThankYou;
