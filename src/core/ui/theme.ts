import { createTheme } from '@mui/material';
import { primaryColor } from './constants/colors';

export const customTheme = createTheme({
  typography: {
    fontFamily: 'roboto',
    h1: {
      fontSize: '2.125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '3rem',
    },
    h2: {
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '2.25rem',
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});
