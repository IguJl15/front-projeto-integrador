import { useAuth } from '@/core/contexts/AuthContext';
import { AuthRoutes } from '@/features/auth';
import { ReactNode } from 'react';
import { createBrowserRouter, redirect, useLoaderData } from 'react-router-dom';

const authenticatedLoader = () => {
  const authData = useAuth();
  console.log(`data from useAuth: ${authData}`);
  
  if (authData == null) throw redirect('/login');

  return authData
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home Page</h1>,
    errorElement: <h1>Error Page</h1>,
  },
  {
    path: 'protected',
    loader: authenticatedLoader,
    element: (
      <div>
        <h1>Conteúdo Protegido</h1>
        <p>Você só é capaz de visualizar o conteúdo desta página pois está logado</p>
        <p>Nome: {2}</p>
      </div>
    ),
  },
  ...AuthRoutes,
]);
