export const CacheKeyFactory = {
  /**
   * datatype: string
   */
  jwtBlacklist(jwt: string) {
    return `jwtBlacklist:jwt:${jwt}`
  },
  /**
   * datatype: string
   */
  authContextInfo(userId: string) {
    return `authContextInfo:userId:${userId}`
  },
}
