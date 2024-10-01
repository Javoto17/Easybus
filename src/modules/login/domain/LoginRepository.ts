import { Login } from "./Login";

export interface LoginRepository {
  login: () => Promise<Login>;
}
