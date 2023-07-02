import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './core/contexts/AuthContext';
import { ErrorProvider } from './core/contexts/ErrorContext';
import { NavBar } from './core/ui/components/NavBar';

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <NavBar />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
