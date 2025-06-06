export const KeyFactory = {
  /**
   * datatype: string - "1"
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
   * datatype: string - JSON {accessToken: string, refreshToken: string}
   */
  refreshTokenTask(currentRefreshToken: string) {
    return `refreshTokenTask:currentRefreshToken:${currentRefreshToken}`
  },
  /**
   * datatype: string - "1"
   */
  activeRefreshToken(userId: string, refreshToken: string) {
    return `activeRefreshToken:userId:${userId}:refreshToken:${refreshToken}`
  },
  /**
   * datatype: string - "1"
   */
  externalTokenBlacklist(jwt: string) {
    return `externalTokenBlacklist:jwt:${jwt}`
  },
}
