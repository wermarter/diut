import { AuthContextDataInternalSerialized } from './context'

export const AUTH_CACHE_SERVICE_TOKEN = Symbol('AUTH_CACHE_SERVICE_TOKEN')

export type RefreshTokenTaskResult = {
  accessToken: string
  refreshToken: string
}

export interface IAuthCacheService {
  iterateActiveRefreshTokens(userId: string): AsyncGenerator<
    {
      key: string
      token: string
    },
    void
  >

  /**
   * keep track for invalidation
   */
  setActiveRefreshToken(
    userId: string,
    refreshToken: string,
    ttlSeconds: number,
  ): Promise<boolean>

  deleteKey(key: string): Promise<boolean>

  deleteAuthContext(userId: string): Promise<boolean>

  blacklistRefreshToken(
    refreshToken: string,
    ttlSeconds: number,
  ): Promise<boolean>

  isRefreshTokenBlacklisted(refreshToken: string): Promise<boolean>

  getRefreshTokenTaskResult(
    refreshToken: string,
    usePrimary?: boolean,
  ): Promise<RefreshTokenTaskResult | null>

  setRefreshTokenTaskResult(
    refreshToken: string,
    result: RefreshTokenTaskResult,
    ttlSeconds: number,
  ): Promise<boolean>

  getAuthContextInfo(
    userId: string,
    usePrimary?: boolean,
  ): Promise<AuthContextDataInternalSerialized | null>

  setAuthContextInfo(
    payload: AuthContextDataInternalSerialized,
  ): Promise<boolean>

  blacklistExternalToken(jwt: string): Promise<boolean>

  isExternalTokenBlacklisted(jwt: string): Promise<boolean>
}
