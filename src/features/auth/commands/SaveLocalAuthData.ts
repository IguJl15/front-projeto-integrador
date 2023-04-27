import UseCase from '@/core/types/UseCase';
import { AuthData } from '../entities/AuthData';
import { AuthRepository } from '../contracts/AuthRepository';

export class SaveLocalAuthData implements UseCase<AuthData, void> {
  constructor(private repository: AuthRepository) {}

  call(params: AuthData): void {
    return this.repository.saveLocalAuthData(params);
  }
}
