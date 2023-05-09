import { MailOutline } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface IEamilTextFieldProps {
  onError?: (error: string | null) => void;
  customValidationFunction?: (email: string) => string | null;
}

export function EmailTextField(props: IEamilTextFieldProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (props.onError != null) props.onError(error);
  }, [error]);

  function onChanged(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const email = event.target?.value;
    if (props.customValidationFunction == null) {
      setError(validate(email));
    } else {
      setError(props.customValidationFunction(email));
    }
  }

  function validate(email: string) {
    const userEmail = email.trim();
    const regex = RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );

    if (regex.exec(userEmail) == null) {
      return 'O email está inválido';
    }

    return null;
  }

  return (
    <TextField
      type="email"
      name="email"
      label="Email"
      error={error != null}
      onChange={onChanged}
      helperText={error}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MailOutline />
          </InputAdornment>
        ),
      }}
    />
  );
}
