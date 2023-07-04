import { Navigate } from 'react-router-dom';
import { User } from '../entities/User';
import { ReactNode } from 'react';

interface IGuardedRoutesProps {
  user: User;
  children: ReactNode;
}

export const GuardedRoutes = (props: IGuardedRoutesProps) => {
  if (!props.user) {
    return <Navigate to={'/login'} />;
  }

  return props.children;
};
