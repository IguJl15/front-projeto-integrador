import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { customTheme } from './core/ui/theme';
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
