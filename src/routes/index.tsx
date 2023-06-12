import App from '@/App';
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
        element: <h1>Home Page</h1>,
      },
      ...AuthRoutes,
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
    errorElement: <h1>Error Page</h1>,
  },
]);
