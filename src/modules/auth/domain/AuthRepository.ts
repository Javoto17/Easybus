export interface AuthRepository {
  login: () => Promise<boolean>;
}
