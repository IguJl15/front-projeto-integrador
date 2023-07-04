import { ReactNode, createContext, useContext, useState } from 'react';
import Failure from '../error/Failure';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

type ErrorContextData = {
  showError(failure: Failure): void;
  runCatchingFailure: <T>(fn: () => T, onError?: () => any) => T | null;
};

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<Failure | null>(null);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  function addError(error: Failure) {
    setError(error);
  }

  function runCatchingFailure<T>(fn: () => T, onError?: () => any): T | null {
    try {
      return fn();
    } catch (error) {
      if (onError) {
        onError();
      }

      if (error instanceof Failure) {
        addError(error);
        return null;
      }

      throw error;
    }
  }

  const data: ErrorContextData = {
    showError: addError,
    runCatchingFailure: runCatchingFailure,
  };

  let errorDetails: ReactNode[] = [];

  if (error?.details) {
    for (const item of error!.details) {
      errorDetails.push(
        <>
          {item.title}: {item.description}
          <br />
        </>
      );
    }
  }

  return (
    <ErrorContext.Provider value={data}>
      <Snackbar open={error != null} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>{error?.title}</AlertTitle>
          {error?.details
            ? error!.details.map((e) => (
              <>
                {e.title}: {e.description}
                <br />
              </>
            ))
            : null}
        </Alert>
      </Snackbar>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);

  return context;
}
