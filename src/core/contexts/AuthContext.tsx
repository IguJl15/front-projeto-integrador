import { API_URL } from '@/config';
import HttpClient, { AxiosClient } from '@/core/http/HttpClient';
import { BrowserLocalStorage } from '@/core/local_storage/LocalStorage';
import { PromiseOr } from '@/core/types/PromiseOr';
import { AuthData, AuthError } from '@/features/auth';
import { AuthRepository } from '@/features/auth/data/AuthRepository';
import { LoginParams } from '@/features/auth/dtos/LoginParams';
import { RegisterParams } from '@/features/auth/dtos/RegisterParams';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextData {
  signed: boolean;
  authData: AuthData | null;
  register(params: RegisterParams): PromiseOr<void>;
  logIn(params: LoginParams): PromiseOr<void>;
  logOut(): PromiseOr<void>;
}

export const httpClient: HttpClient = new AxiosClient(API_URL);

export const authRepository = new AuthRepository(httpClient, BrowserLocalStorage.instance);

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authData, setUser] = useState<AuthData | null>(null);

  useEffect(() => {
    try {
      const storedAuthData = authRepository.getLocalAuthData();

      setUser(storedAuthData);
    } catch (error) {
      if (error instanceof AuthError == false) {
        throw error;  
      }
    }
  }, []);

  async function logIn(params: LoginParams) {
    const loginResponse = await authRepository.login(params);

    data.authData = loginResponse;
    data.signed = true;

    setUser(loginResponse);
  }

  async function register(params: RegisterParams) {
    const registerResponse = await authRepository.register(params);

    data.authData = registerResponse;
    data.signed = true;

    setUser(registerResponse);
  }

  function logOut() {
    authRepository.deleteLocalAuthData();

    setUser(null);
  }

  const data: AuthContextData = {
    signed: authData != null,
    authData: authData,
    logIn: logIn,
    logOut: logOut,
    register: register,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
