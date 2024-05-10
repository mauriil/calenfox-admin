import React from 'react';
import { Card, CardContent, TextField, Button, Divider, Typography, Box, Fade } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/router';

const SignInComponent = ({ setIsSignUp }) => {
    const router = useRouter();
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });

    const handleNormalSignIn = () => {
        setFormSubmitted(true);
        if (user.email && user.password) {
            // Aquí puedes implementar la lógica para iniciar sesión
            console.log('Iniciando sesión...');
            router.push('/dashboard');
        }
    }

    const handleGoogleSignIn = () => {
        // Aquí puedes implementar la lógica para iniciar sesión con Google
    };

    return (
        <Card variant="outlined" sx={{
            borderRadius: 4,
            boxShadow: '15px 25px 15px rgba(0, 0, 0, 0.1)',
            maxWidth: 400,
            margin: 'auto',
        }}>
            <CardContent>
                <Fade
                 in={true} timeout={800}>
                    <div>
                        <Box display="flex" alignItems="center">
                            <img src='https://i.pinimg.com/originals/f9/61/4e/f9614e582b04f7927c86291eda26e0b2.jpg' alt="Logo" width="30" height="30" />
                            <Typography variant="h6" component="h2" style={{ marginLeft: 10 }}>
                                CalenFox
                            </Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            mt: 1,
                            mb: 2,
                        }}>
                            Tu aplicación de inicio de sesión
                        </Typography>
                        <TextField
                            id="email"
                            label="Correo electrónico"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            color='secondary'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            error={formSubmitted && !user.email}
                            helperText={formSubmitted && !user.email ? 'Este campo es requerido' : ''}
                        />
                        <TextField
                            id="password"
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            color='secondary'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            error={formSubmitted && !user.password}
                            helperText={formSubmitted && !user.password ? 'Este campo es requerido' : ''}
                        />
                        <Box display="flex" flexDirection='column' alignItems="center" mt={2}>
                            <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} onClick={handleNormalSignIn}>Ingresar</Button>
                            <Box flexDirection='row' display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                <Typography variant="caption" sx={{ ml: 1, cursor: 'pointer' }}>¿Olvidaste tu contraseña?</Typography>
                                <Typography variant="caption" sx={{ ml: 1, color: 'primary.secondary', cursor: 'pointer' }} onClick={setIsSignUp} >Crear cuenta nueva</Typography>
                            </Box>
                        </Box>
                    </div>
                </Fade>
                <Divider style={{ margin: '20px 0' }} />
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleGoogleSignIn}
                    startIcon={<GoogleIcon />}
                >
                    Iniciar sesión con Google
                </Button>
            </CardContent>
        </Card>
    );
};

export default SignInComponent;
