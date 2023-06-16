import { useAuth } from '@/core/contexts/AuthContext';
import { EmailTextField } from '@/features/auth/components/EmailTextField';
import { PasswordTextField } from '@/features/auth/components/PasswordTextField';
import { black60 } from '@/core/ui/constants/colors';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type ErrorState = {
  emailError: string | null;
  passwordError: string | null;
};

export default function Login() {
  const { signed, logIn } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrorState>({
    emailError: null,
    passwordError: null,
  });

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

  function emptyPasswordValidation(text: string) {
    if (text == '') {
      setErrors({
        ...errors,
        passwordError: 'O campo precisa ser preenchido',
      });

      return 'O campo precisa ser preenchido';
    }

    setErrors({ ...errors, passwordError: null });
    return null;
  }

  function emptyEmailValidation(text: string) {
    if (text == '') {
      setErrors({
        ...errors,
        passwordError: 'O campo precisa ser preenchido',
      });

      return 'O campo precisa ser preenchido';
    }

    setErrors({ ...errors, emailError: null });
    return null;
  }

  function isValidForm(): boolean {
    return (errors.emailError || errors.passwordError) == null;
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
                <EmailTextField
                  customValidationFunction={emptyEmailValidation}
                  onError={(error) => {
                    setErrors({ ...errors, emailError: error });
                  }}
                />
                <PasswordTextField
                  label="Senha"
                  customValidateFunction={emptyPasswordValidation}
                  onError={(error) => {
                    setErrors({ ...errors, passwordError: error });
                  }}
                />
              </Stack>
            </Box>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Link to="/register">
              <Button>Criar conta</Button>
            </Link>
            <Button type="submit" variant="contained" disabled={!isValidForm()}>
              Entrar
            </Button>
          </Stack>
          </form>
        </Stack>
      </Box>
    </div>
  );
}
