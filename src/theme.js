import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#3F2559',
    },
    secondary: {
      main: '#D95204',
    },
    background: {
      paper: '#fff',
      default: '#9B8ABF',
    },
    error: {
      main: '#a73e2b',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #__next {
          overscroll-behavior: none;
        }
      `,
    },
  },
});

export default theme;
