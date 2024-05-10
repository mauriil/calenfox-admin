import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ProTip from '../../src/ProTip';
import Copyright from '../../src/Copyright';
import ThankYou from '../../components/dashboard/ThanksForRegistering';
import MenuComponent from '../../components/dashboard/MenuComponent';

export default function Index() {
  const [showThankYou, setShowThankYou] = React.useState(true);

  return (
    <Container maxWidth="sm" sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      <Box>
        {showThankYou ? (
          <ThankYou handleOk={() => setShowThankYou(false)} />
        ) : (
          <MenuComponent />
        )
        }
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
