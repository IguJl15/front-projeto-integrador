import { AuthData } from '../entities/AuthData';
import { AuthRepository } from '../contracts/AuthRepository';
import HttpClient from '@/core/http/HttpClient';
import { LocalAuthDataNotFound } from '../errors/LocalAuthDataNotFound';
import LocalStorage from '@/core/local_storage/LocalStorage';
import { LoginParameters } from '../commands/LoginUseCase';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private httpClient: HttpClient, private localStorage: LocalStorage) {}

  static localStorageKey = 'auth_data';

  getLocalAuthData(): AuthData {
    const localResponse = this.localStorage.read<AuthData>(AuthRepositoryImpl.localStorageKey);

    if (!localResponse) throw new LocalAuthDataNotFound();

    return localResponse as AuthData;
  }

  deleteLocalAuthData() {
    this.localStorage.delete(AuthRepositoryImpl.localStorageKey);
  }

  saveLocalAuthData(authData: AuthData) {
    this.localStorage.save(AuthRepositoryImpl.localStorageKey, authData);
  }

  async login(data: LoginParameters): Promise<AuthData> {
    const response = await this.httpClient.post<AuthData>('/login', data);

    return response;
  }
}