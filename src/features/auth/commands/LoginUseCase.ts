import UseCase from '@/core/types/UseCase';
import { AuthRepository } from '../contracts/AuthRepository';
import { AuthData } from '../entities/AuthData';

export class LoginUsecase implements UseCase<LoginParameters, AuthData> {
  constructor(public repository: AuthRepository) {}

  async call(params: LoginParameters): Promise<AuthData> {
    const userFromRepo = await this.repository.login(params);

    this.repository.saveLocalAuthData(userFromRepo);

    return userFromRepo;
  }
}

export type LoginParameters = {
  email: string;
  password: string;
};
