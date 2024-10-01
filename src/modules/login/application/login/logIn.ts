import { Login } from "../../domain/Login"
import { LoginRepository } from "../../domain/LoginRepository"

export async function login (
    loginRepository: LoginRepository,
): Promise<Login> {
    return loginRepository.login()
}