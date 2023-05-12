import { createTheme } from '@mui/material';
import { primaryColor } from './constants/colors';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});
