import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import SignInComponent from '../components/Auth/SignIn';
import SignUpComponent from '../components/Auth/SignUp';

export default function Index() {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <Container maxWidth="sm" sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: 4, 
    }}>
      <Box>
        {isSignUp ? (
          <SignUpComponent setIsSignUp={() => setIsSignUp(false)} />
        ) : (
          <SignInComponent setIsSignUp={() => setIsSignUp(true)} />
        )
        }
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
