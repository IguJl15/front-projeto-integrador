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
        element: <Dashboard />,
      },
      ...AuthRoutes,
    ],
    errorElement: <h1>Error Page</h1>,
  },
]);
