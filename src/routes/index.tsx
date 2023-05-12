import App from '@/App';
import { AuthRoutes } from '@/features/auth';
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
    ],
    errorElement: <h1>Error Page</h1>,
  },
]);
