import HttpClient from '@/core/http/HttpClient';
import { BrowserLocalStorage } from '@/core/local_storage/LocalStorage';
import { AuthData } from '../entities/AuthData';
import { LocalAuthDataNotFound } from '../errors/LocalAuthDataNotFound';
import { RegisterParams } from '../dtos/RegisterParams';
import { LoginParams } from '../dtos/LoginParams';

export class AuthRepository {
  constructor(private httpClient: HttpClient, private localStorage: BrowserLocalStorage) {}

  static localStorageKey = 'auth_data';

  getLocalAuthData(): AuthData {
    const localResponse = this.localStorage.read<AuthData>(AuthRepository.localStorageKey);

    if (!localResponse) throw new LocalAuthDataNotFound();

    return localResponse as AuthData;
  }

  deleteLocalAuthData() {
    this.localStorage.delete(AuthRepository.localStorageKey);
  }

  saveLocalAuthData(authData: AuthData) {
    this.localStorage.save(AuthRepository.localStorageKey, authData);
  }

  async refreshTokens(): Promise<AuthData> {
    const refreshToken = this.getLocalAuthData().refreshToken;

    const response = await this.httpClient.post<AuthData>('/auth/refresh', {
      refreshToken: refreshToken,
    });

    this.saveLocalAuthData(response);

    return response;
  }

  async register(data: RegisterParams): Promise<AuthData> {
    const response = await this.httpClient.post<AuthData>('/auth/register', data);

    this.saveLocalAuthData(response);

    return response;
  }

  async login(data: LoginParams): Promise<AuthData> {
    const response = await this.httpClient.post<AuthData>('/auth/login', data);
    this.saveLocalAuthData(response);

    return response;
  }
}
