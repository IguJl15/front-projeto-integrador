import { createTheme } from '@mui/material';
import { primaryColor } from './constants/colors';

export const customTheme = createTheme({
  typography: {
    fontFamily: 'roboto',
    h1: {
      fontSize: '2.125rem',
      lineHeight: '3rem',
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});
