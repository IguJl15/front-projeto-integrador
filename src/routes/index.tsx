import App from '@/App';
import { DirectionPage } from '@/features/directions/pages'
import { AuthRoutes } from '@/features/auth';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DirectionPage />,
      },
      ...AuthRoutes,
    ],
    errorElement: <h1>Error Page</h1>,
  },
]);
