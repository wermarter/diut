import { AuthContextData } from './context'

export const AUTH_SERVICE_TOKEN = Symbol('AUTH_SERVICE_TOKEN')

export interface IAuthService {
  invalidate(context: AuthContextData): Promise<void>
}
