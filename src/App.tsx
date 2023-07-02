import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './core/contexts/AuthContext';
import NavBar from './core/ui/components/NavBar';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
        <Outlet />
      </Container>
    </AuthProvider>
  );
}

export default App;
