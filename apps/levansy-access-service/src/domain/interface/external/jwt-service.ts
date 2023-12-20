export const JwtServiceToken = Symbol('JwtService')

export interface IJwtService {
  sign(payload: any): string
  verify(token: string): any
}
