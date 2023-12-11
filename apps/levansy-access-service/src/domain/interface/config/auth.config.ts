export const AuthConfigToken = Symbol('AuthConfig')

export interface IAuthConfig {
  AUTH_JWT_SECRET: string

  AUTH_JWT_EXPIRES_IN: string
}
