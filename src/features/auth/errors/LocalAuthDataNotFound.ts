import { AuthError } from './AuthError';

export class LocalAuthDataNotFound extends AuthError {
  constructor() {
    super('Local user not found');
  }
}
