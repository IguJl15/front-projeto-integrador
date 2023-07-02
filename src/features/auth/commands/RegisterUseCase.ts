import UseCase from '@/core/types/UseCase';
import { AuthRepository } from '../contracts/AuthRepository';
import { AuthData } from '../entities/AuthData';

export class RegisterUsecase implements UseCase<RegisterParameters, AuthData> {
  constructor(public repository: AuthRepository) {}

  async call(params: RegisterParameters): Promise<AuthData> {
    const userFromRepo = await this.repository.register(params);

    this.repository.saveLocalAuthData(userFromRepo);

    return userFromRepo;
  }
}

export type RegisterParameters = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
