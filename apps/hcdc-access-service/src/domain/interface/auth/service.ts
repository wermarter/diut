import { AuthContextData } from './context'

export const AuthServiceToken = Symbol('AuthService')

export interface IAuthService {
  invalidate(context: AuthContextData): Promise<void>
}
