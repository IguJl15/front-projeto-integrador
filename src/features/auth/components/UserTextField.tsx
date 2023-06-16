import { PersonOutline } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export const UserTextField = ({ onError }: { onError?: (error: string | null) => void }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (onError != null) onError(error);
  }, [error]);

  function userNameValidation(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const userName = event.target?.value.trim();
    if (userName == '') return setError('O nome não pode estar vazio');

    const regex = RegExp('^[ a-zA-Z\u00C0-\u017F]+$');
    if (regex.exec(userName) === null) {
      return setError('O nome deve conter somente letras');
    }
    return setError(null);
  }

  return (
    <TextField
      type="text"
      name="name"
      label="Nome completo"
      error={error != null}
      onChange={userNameValidation}
      helperText={error}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonOutline />
          </InputAdornment>
        ),
      }}
    />
  );
};
