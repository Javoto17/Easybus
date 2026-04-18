export interface AuthRepository {
  login: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  validateToken: () => Promise<boolean>;
  getToken: () => Promise<string | null>;
  getExpiresAt: () => Promise<Date | null>;
}
