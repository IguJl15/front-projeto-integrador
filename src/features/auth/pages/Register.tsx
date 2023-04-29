import { useAuth } from '@/core/contexts/AuthContext';
import { EmailTextField } from '@/core/ui/components/EmailTextField';
import { black60 } from '@/core/ui/constants/colors';
import {
  MailOutline,
  PersonOutline,
  Visibility,
  VisibilityOff,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ErrorState = {
  nameError: string | null;
  emailError: string | null;
  passwordError: string | null;
  passwordConfirmationError: string | null;
};

export default function Register() {
  const navigate = useNavigate();
  const { signed, register } = useAuth();

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

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    register({
      name: '',
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      passwordConfirmation: '',
    });
  }

  function validateName(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target?.value.trim();
    if (name == '') return setErrors({ ...errors, nameError: 'O nome não pode estar vazio' });

    const regex = RegExp('^[ a-zA-Z\u00C0-\u017F]+$');
    if (regex.exec(name) == null)
      return setErrors({ ...errors, nameError: 'O nome deve conter somente letras' });

    return setErrors({ ...errors, nameError: null });
  }

  function validatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target?.value;

    setPassword(event.target?.value);

    const regex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    if (regex.exec(password) == null) {
      return setErrors({
        ...errors,
        passwordError: `A senha deve conter pelo menos: uma letra minúscula, uma letra maiúscula, um número, um caractere especial (!@#$%^&*)`,
      });
    }

    return setErrors({ ...errors, passwordError: null });
  }

  function validatePasswordConfirmation(event: React.ChangeEvent<HTMLInputElement>) {
    const passwordConfirmation = event.target?.value;

    if (password != passwordConfirmation) {
      return setErrors({
        ...errors,
        passwordConfirmationError: `As senhas devem ser iguais`,
      });
    }

    return setErrors({ ...errors, passwordConfirmationError: null });
  }

  function isValidForm(): boolean {
    return (errors.nameError || errors.passwordError || errors.emailError || errors.passwordConfirmationError) == null;
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
            <Typography variant="h4">{password}</Typography>
            <Typography variant="body1" color={black60}>
              Seja bem-vindo(a)! Estamos felizes em ter você aqui. Para começar, por favor preencha
              os campos abaixo com seus dados.
            </Typography>
          </Stack>
          <form onSubmit={onSubmit}>
            <Box>
              <Stack spacing={'20px'}>
                <TextField
                  type="email"
                  name="email"
                  label="Nome completo"
                  error={errors.nameError != null}
                  onChange={validateName}
                  helperText={errors.nameError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    ),
                  }}
                />
                <EmailTextField
                  onError={(error) => {
                    console.log("ON ERROR");
                    console.log(error );
                    
                    setErrors({ ...errors, emailError: error });
                  }}
                />
                <TextField
                  type="password"
                  name="password"
                  label="Senha"
                  error={errors.passwordError != null}
                  onChange={validatePassword}
                  helperText={errors.passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {true ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  type="password"
                  name="password"
                  label="Confirmar senha"
                  error={errors.passwordConfirmationError != null}
                  onChange={validatePasswordConfirmation}
                  helperText={errors.passwordConfirmationError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {true ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
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
            <Button>Entrar</Button>
            <Button type="submit" variant="contained" disabled={!isValidForm()}>
              Criar conta
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
