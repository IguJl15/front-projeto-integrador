import { API_URL } from '@/config';
import HttpClient, { AxiosClient } from '@/core/http/HttpClient';
import { BrowserLocalStorage } from '@/core/local_storage/LocalStorage';
import { PromiseOr } from '@/core/types/PromiseOr';
import {
  AuthData,
  AuthError,
  AuthRepository,
  AuthRepositoryImpl,
  LoginParameters,
  LoginUsecase,
} from '@/features/auth';
import { RegisterParameters, RegisterUsecase } from '@/features/auth/commands/RegisterUseCase';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextData {
  signed: boolean;
  authData: AuthData | null;
  register(params: RegisterParameters): PromiseOr<void>;
  logIn(params: LoginParameters): PromiseOr<void>;
  logOut(): PromiseOr<void>;
}

const httpClient: HttpClient = new AxiosClient(API_URL);
const authRepository: AuthRepository = new AuthRepositoryImpl(
  httpClient,
  BrowserLocalStorage.instance
);

const loginUseCase = new LoginUsecase(authRepository);
const registerUseCase = new RegisterUsecase(authRepository);

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

  async function logIn(params: LoginParameters) {
    const loginResponse = await loginUseCase.call(params);

    data.authData = loginResponse;
    data.signed = true;

    setUser(loginResponse);
  }

  async function register(params: RegisterParameters) {
    const registerResponse = await registerUseCase.call(params);

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
