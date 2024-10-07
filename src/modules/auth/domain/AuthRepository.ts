import { Auth } from './Auth';

export interface AuthRepository {
  login: () => Promise<boolean>;
}
