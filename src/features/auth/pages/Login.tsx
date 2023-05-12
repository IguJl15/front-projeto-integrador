import { useAuth } from '@/core/contexts/AuthContext';
import { EmailTextField } from '@/core/ui/components/EmailTextField';
import { black60 } from '@/core/ui/constants/colors';
import { VpnKeyOutlined } from '@mui/icons-material';
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { signed, logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (signed) navigate('/');
  });

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    logIn({
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    });
  }

  return (
    <div
      style={{
        position: 'absolute',

        left: '50%',
        top: '50%',

        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box boxShadow={8} padding={'24px'} width={350}>
        <Stack spacing={'24px'}>
          <Stack spacing={'8px'}>
            <Typography variant="h4">Entrar</Typography>
            <Typography variant="body1" color={black60}>
              Bem vindo de volta. Estamos contentes em ver você novamente. Para continuar, por favor
              digite seu e-mail e senha nos campos abaixo.
            </Typography>
          </Stack>
          <form onSubmit={onSubmit}>
            <Box>
              <Stack spacing={'20px'}>
                <EmailTextField />
                <TextField
                  type="password"
                  name="password"
                  label="Senha"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Box>
          </form>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Link to="/register">
              <Button>Criar conta</Button>
            </Link>
            <Button type="submit" variant="contained">
              Entrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
