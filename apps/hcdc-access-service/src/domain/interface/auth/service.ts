import { AuthContextData } from './context'

export const AUTH_SERVICE_TOKEN = Symbol('AuthService')

export interface IAuthService {
  invalidate(context: AuthContextData): Promise<void>
}
