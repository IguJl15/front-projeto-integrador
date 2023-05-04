import { RouteObject } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { PhoneRegister } from './PhoneRegiste';

export const AuthRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'phone register',
    element: <PhoneRegister />,
  },
];
