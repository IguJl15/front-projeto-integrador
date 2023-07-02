import App from '@/App';
import { DirectionPage } from '@/features/directions/pages'
import { AuthRoutes } from '@/features/auth';
import { Dashboard } from '@/features/dashboard/pages/Dashboard';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/directions',
        element: <DirectionPage />
      },
      ...AuthRoutes,
    ],
    errorElement: <h1>Error Page</h1>,
  },
]);
