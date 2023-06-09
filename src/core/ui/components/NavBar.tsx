import { useAuth } from '@/core/contexts/AuthContext';
import { AccountCircle, Login } from '@mui/icons-material';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { greenColor } from '../constants/colors';

export function NavBar() {
  const auth = useAuth();

  return (
    <AppBar position="static" style={{ backgroundColor: greenColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters={true}>
          <Link to="/">
            <img src="https://lorempic.com/46" alt="A" style={{ padding: '0px 8px' }} />
          </Link>
          <Box sx={{ display: { xs: 'flex' } }}>
            <NavBarItem url="/">
              <Typography variant="body1">Dashboard</Typography>
            </NavBarItem>
            <NavBarItem url="/directions">
              <Typography variant="body1">Direcionamentos</Typography>
            </NavBarItem>
          </Box>
          <Box
            height={30}
            sx={{
              backgroundColor: 'white',
              borderRadius: '24px',
              flexGrow: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color="black">
              Imagine a search bar aqui
            </Typography>
          </Box>
          <div style={{ padding: '0px 8px' }}>
            {!auth.signed && (
              <Link to="/login">
                <Button variant="contained" startIcon={<Login />}>
                  Login
                </Button>
              </Link>
            )}
            {auth.signed && (
              <Link to="/account">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Link>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function NavBarItem({ children, url }: { children: ReactNode; url?: string }) {
  return (
    <Link to={url ?? '#'}>
      <Box sx={{ padding: { xs: '0px 2px', sm: '0px 8px' } }}>
        <Button variant="text">{children}</Button>
      </Box>
    </Link>
  );
}
