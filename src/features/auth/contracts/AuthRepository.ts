import { LoginParameters } from '../commands/LoginUseCase';
import { RegisterParameters } from '../commands/RegisterUseCase';
import { AuthData } from '../entities/AuthData';

export interface AuthRepository {
  getLocalAuthData(): AuthData;
  saveLocalAuthData(authData: AuthData): void;
  deleteLocalAuthData(): void;

  login(data: LoginParameters): Promise<AuthData>;
  register(params: RegisterParameters): Promise<AuthData>;
}
