import { Visibility, VisibilityOff, VpnKeyOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface IPasswordTextFieldProps {
  onError?: (error: string | null) => void;
  customValidateFunction?: (password: string) => string | null;
  onChanged?: (password: string) => void;
  name: string;
  label?: string;
}

export const PasswordTextField = (props: IPasswordTextFieldProps) => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (props.onError != null) props.onError(error);
  }, [error]);

  function handleClickPassword() {
    setShowPassword(!showPassword);
  }

  function onChanged(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const password = event.target?.value;

    if (props.customValidateFunction != null) {
      setError(props.customValidateFunction(password));
    } else {
      setError(passwordValidation(password));
    }

    if (props.onChanged != null) {
      props.onChanged(password);
    }
  }

  function passwordValidation(password: string) {
    const regex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    if (regex.exec(password) == null) {
      return `A senha deve conter pelo menos: uma letra minúscula, uma letra maiúscula, um número, um caractere especial (!@#$%^&*)`;
    }

    return null;
  }

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      name={props.name}
      label={props.label}
      error={error != null}
      onChange={onChanged}
      helperText={error}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <VpnKeyOutlined />
          </InputAdornment>
        ),
        endAdornment: (
          <IconButton onClick={handleClickPassword}>
            <InputAdornment position="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </InputAdornment>
          </IconButton>
        ),
      }}
    />
  );
};
