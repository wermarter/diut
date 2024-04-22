export const CacheKeyFactory = {
  /**
   * datatype: string - 1
   */
  refreshTokenBlacklist(jwt: string) {
    return `refreshTokenBlacklist:jwt:${jwt}`
  },
  /**
   * datatype: string - JSON
   */
  authContextInfo(userId: string) {
    return `authContextInfo:userId:${userId}`
  },
  /**
   * datatype: string
   * - 0: in progress
   * - JSON: {accessToken: string, refreshToken: string}
   */
  refreshTokenTask(currentRefreshToken: string) {
    return `refreshTokenTask:currentRefreshToken:${currentRefreshToken}`
  },
}
