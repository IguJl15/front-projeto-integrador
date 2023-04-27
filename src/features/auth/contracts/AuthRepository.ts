import { LoginParameters } from '../commands/LoginUseCase';
import { AuthData } from '../entities/AuthData';

export interface AuthRepository {
  getLocalAuthData(): AuthData;
  saveLocalAuthData(authData: AuthData): void;
  deleteLocalAuthData(): void;

  login(data: LoginParameters): Promise<AuthData>;
}