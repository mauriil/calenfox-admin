import React from 'react';
import { Card, CardContent, TextField, Button, Divider, Typography, Box, Fade } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const SignUpComponent = ({ setIsSignUp }) => {
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const validateArgentinaPhone = (phone) => {
    const phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    return phoneRegex.test(phone);
  }

  const handleNormalSignUp = () => {
    setFormSubmitted(true);
    if (!validateArgentinaPhone(user.phone)) {
      console.log('El teléfono no es válido');
      return;
    }
    if (user.name && user.email && user.password && user.phone) {
      console.log('Registrando usuario...');
    }
  }

  const handleGoogleSignUp = () => {
    // Aquí puedes implementar la lógica para iniciar sesión con Google
  };

  return (
    <Card variant="outlined" sx={{
      borderRadius: 4,
      boxShadow: '15px 25px 15px rgba(0, 0, 0, 0.1)',
      maxWidth: 400,
      marginTop: 4,
    }}>
      <CardContent>
        <Fade in={true} timeout={800}>
          <div>
            <Box display="flex" alignItems="center">
              <img src='https://i.pinimg.com/originals/f9/61/4e/f9614e582b04f7927c86291eda26e0b2.jpg' alt="Logo" width="30" height="30" />
              <Typography variant="h6" component="h2" style={{ marginLeft: 10 }}>
                Fox
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mt: 1,
              mb: 2,
            }}>
              Registrate en Fox
            </Typography>
            <TextField
              id="name"
              label="Nombre completo"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.name}
              onChange={handleChange}
              error={formSubmitted && !user.name}
              helperText={formSubmitted && !user.name ? 'Este campo es requerido' : ''}
            />
            <TextField
              id="email"
              label="Correo electrónico"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={handleChange}
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
              value={user.password}
              onChange={handleChange}
              error={formSubmitted && !user.password}
              helperText={formSubmitted && !user.password ? 'Este campo es requerido' : ''}
            />
            <TextField
              id="phone"
              label="Teléfono"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.phone}
              onChange={handleChange}
              error={formSubmitted && !user.phone}
              helperText={formSubmitted && !user.phone ? 'Este campo es requerido' : ''}
            />
            <Box display="flex" flexDirection='column' alignItems="center" mt={2}>
              <Button variant="contained" color="secondary" fullWidth sx={{ mb: 1 }} onClick={handleNormalSignUp}>Crear cuenta</Button>
              <Box flexDirection='row' display='flex' justifyContent='center' sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ ml: 1, cursor: 'pointer' }} color='secondary' onClick={setIsSignUp} >Ya tengo cuenta</Typography>
              </Box>
            </Box>
          </div>
        </Fade>
        <Divider style={{ margin: '20px 0' }} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGoogleSignUp}
          startIcon={<GoogleIcon />}
        >
          Iniciar sesión con Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignUpComponent;
