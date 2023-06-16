import { useAuth } from '@/core/contexts/AuthContext';
import { EmailTextField } from '@/features/auth/components/EmailTextField';
import { PasswordTextField } from '@/features/auth/components/PasswordTextField';
import { UserTextField } from '@/features/auth/components/UserTextField';
import { black60, black87 } from '@/core/ui/constants/colors';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Failure from '@/core/error/Failure';
import { useError } from '@/core/contexts/ErrorContext';

type ErrorState = {
  nameError: string | null;
  emailError: string | null;
  passwordError: string | null;
  passwordConfirmationError: string | null;
};

export default function Register() {
  const navigate = useNavigate();
  const { signed, register } = useAuth();
  const { showError } = useError();

  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<ErrorState>({
    nameError: null,
    emailError: null,
    passwordError: null,
    passwordConfirmationError: null,
  });

  useEffect(() => {
    if (signed) navigate('/');
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.table(formData);
    try {
      await register({
        fullName: formData.get('name')?.toString() ?? '',
        email: formData.get('email')?.toString() ?? '',
        password: formData.get('password')?.toString() ?? '',
        passwordConfirmation: formData.get('password')?.toString() ?? '',
      });
    } catch (error) {
      if (error instanceof Failure) {
        showError(error);
      }
    }
  }

  function validatePasswordConfirmation(passwordConfirmation: string): string | null {
    if (password != passwordConfirmation) {
      setErrors({
        ...errors,
        passwordConfirmationError: `As senhas devem ser iguais`,
      });

      return 'As senhas devem ser iguais';
    }

    setErrors({ ...errors, passwordConfirmationError: null });

    return null;
  }

  function isValidForm(): boolean {
    return (
      (errors.nameError ||
        errors.passwordError ||
        errors.emailError ||
        errors.passwordConfirmationError) == null
    );
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
            <Typography variant="h4">Registre-se</Typography>
            <Typography variant="body1" color={black60}>
              Seja bem-vindo(a)! Estamos felizes em ter você aqui. Para começar, por favor preencha
              os campos abaixo com seus dados.
            </Typography>
          </Stack>
          <form onSubmit={onSubmit}>
            <Stack spacing={'24px'}>
              <Box>
                <Stack spacing={'20px'}>
                  <UserTextField
                    onError={(error) => {
                      setErrors({ ...errors, nameError: error });
                    }}
                  />
                  <EmailTextField
                    onError={(error) => {
                      setErrors({ ...errors, emailError: error });
                    }}
                  />
                  <PasswordTextField
                    label="Senha"
                    name="new-password"
                    onChanged={(password: string) => setPassword(password)}
                    onError={(error) => {
                      setErrors({ ...errors, passwordError: error });
                    }}
                  />
                  <PasswordTextField
                    label="Confirmar Senha"
                    name="new-password"
                    customValidateFunction={validatePasswordConfirmation}
                    onError={(error) => {
                      setErrors({ ...errors, passwordConfirmationError: error });
                    }}
                  />
                </Stack>
              </Box>
              <Typography variant="caption" color={black87}>
                Ao se cadastrar, você concorda com os nossos{' '}
                <Link to={'/'}>
                  <Typography variant="caption" color={'black'}>
                    Termos e Condições de uso
                  </Typography>
                </Link>
                . Leia-os com atenção antes de prosseguir.
              </Typography>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Link to={'/login'}>
                  <Button>Fazer Login</Button>
                </Link>
                <Button type="submit" variant="contained" disabled={!isValidForm()}>
                  Criar conta
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </div>
  );
}
