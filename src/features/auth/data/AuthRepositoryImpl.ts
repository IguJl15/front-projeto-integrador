import HttpClient from '@/core/http/HttpClient';
import { BrowserLocalStorage } from '@/core/local_storage/LocalStorage';
import { LoginParameters } from '../commands/LoginUseCase';
import { AuthRepository } from '../contracts/AuthRepository';
import { AuthData } from '../entities/AuthData';
import { LocalAuthDataNotFound } from '../errors/LocalAuthDataNotFound';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(public httpClient: HttpClient) {}

  static localStorageKey = 'auth_data';

  getLocalAuthData(): AuthData {
    const localResponse = BrowserLocalStorage.instance.read<AuthData>(
      AuthRepositoryImpl.localStorageKey
    );

    if (!localResponse) throw new LocalAuthDataNotFound();

    return localResponse as AuthData;
  }

  saveLocalAuthData(authData: AuthData) {
    BrowserLocalStorage.instance.save(AuthRepositoryImpl.localStorageKey, authData);
  }

  async login(data: LoginParameters): Promise<AuthData> {
    try {      
      const response = await this.httpClient.post<AuthData>('/login', data);

      return response;
    } catch (error) {
      console.log("erro no repo");
      
      throw error;
    }
  }
}
