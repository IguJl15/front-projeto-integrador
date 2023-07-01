import { createTheme } from '@mui/material';
import { primaryColor } from './constants/colors';

export const customTheme = createTheme({
  typography: {
    fontFamily: 'roboto'
  },
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});
