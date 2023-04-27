import HttpClient, { AxiosClient } from '@/core/http/HttpClient';
import {
  AuthData,
  AuthRepository,
  AuthRepositoryImpl,
  AuthError,
  LoginUsecase,
  LoginParameters,
} from '@/features/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { PromiseOr } from '../types/PromiseOr';
import { API_URL } from '@/config';

interface AuthContextData {
  signed: boolean;
  authData: AuthData | null;
  logIn(params: LoginParameters): PromiseOr<void>;
  logOut(): PromiseOr<void>;
}

const httpClient: HttpClient = new AxiosClient(API_URL);
const authRepository: AuthRepository = new AuthRepositoryImpl(httpClient);

const loginUseCase = new LoginUsecase(authRepository);

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authData, setUser] = useState<AuthData | null>(null);

  useEffect(() => {
    try {
      const storedAuthData = authRepository.getLocalAuthData();

      setUser(storedAuthData);
    } catch (error) {
      if (error instanceof AuthError == false) {
        console.log('erro no auth Context');
        console.log(error);

        throw error;
      }
    }
  }, []);

  async function logIn(params: LoginParameters) {
    const loginResponse = await loginUseCase.call(params);

    data.authData = loginResponse;
    data.signed = true;

    setUser(loginResponse);
  }

  function logOut() {
    setUser(null);
  }

  const data: AuthContextData = {
    signed: authData != null,
    authData: authData,
    logIn: logIn,
    logOut: logOut,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
