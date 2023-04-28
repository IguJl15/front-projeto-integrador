import UseCase from '@/core/types/UseCase';
import { AuthRepository } from '../contracts/AuthRepository';
import { AuthData } from '../entities/AuthData';

export class SaveLocalAuthData implements UseCase<AuthData, void> {
  constructor(private repository: AuthRepository) {}

  call(params: AuthData): void {
    return this.repository.saveLocalAuthData(params);
  }
}
