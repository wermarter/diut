import {
  getRedisClientServiceToken,
  RedisClientService,
} from '@diut/nestjs-infra'
import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextDataInternalSerialized,
  IAuthCacheService,
  RefreshTokenTaskResult,
} from 'src/domain'
import { KeyFactory } from '../key'
import { REDIS_PRIMARY_CONNECTION, REDIS_SECONDARY_CONNECTION } from '../common'
import { AuthConfig, loadAuthConfig } from 'src/config'

@Injectable()
export class AuthCacheService implements IAuthCacheService {
  constructor(
    @Inject(getRedisClientServiceToken(REDIS_PRIMARY_CONNECTION))
    private readonly primaryClient: RedisClientService,
    @Inject(getRedisClientServiceToken(REDIS_SECONDARY_CONNECTION))
    private readonly secondaryClient: RedisClientService,
    @Inject(loadAuthConfig.KEY)
    private readonly authConfig: AuthConfig,
  ) {}

  async *iterateActiveRefreshTokens(userId: string) {
    const keys = this.primaryClient.scan(
      KeyFactory.activeRefreshToken(userId, '*'),
    )

    for await (const key of keys) {
      const token = key.match(
        KeyFactory.activeRefreshToken(userId, '(.+)'),
      )?.[1]

      if (!token) {
        throw new Error(`Cannot parse token key: "${key}"`)
      }

      yield { key, token }
    }
  }

  async setActiveRefreshToken(
    userId: string,
    refreshToken: string,
    ttlSeconds: number,
  ) {
    const rv = await this.primaryClient.client.set(
      KeyFactory.activeRefreshToken(userId, refreshToken),
      '1',
      'EX',
      ttlSeconds,
    )

    return rv === 'OK'
  }

  async isRefreshTokenBlacklisted(refreshToken: string) {
    const rv = await this.secondaryClient.client.exists(
      KeyFactory.refreshTokenBlacklist(refreshToken),
    )

    return rv !== 0
  }

  async blacklistRefreshToken(refreshToken: string, ttlSeconds: number) {
    const rv = await this.primaryClient.client.set(
      KeyFactory.refreshTokenBlacklist(refreshToken),
      '1',
      'EX',
      ttlSeconds,
      'NX',
    )

    if (rv !== 'OK') {
      return false
    }

    return this.primaryClient.synchronize()
  }

  async deleteKey(key: string) {
    const deletedCount = await this.primaryClient.client.del(key)
    return deletedCount === 1
  }

  async deleteAuthContext(userId: string) {
    const deletedCount = await this.primaryClient.client.del(
      KeyFactory.authContextInfo(userId),
    )

    if (deletedCount === 0) {
      return false
    }

    return this.primaryClient.synchronize()
  }

  async getJSONValue<TValue>(key: string, usePrimary = false) {
    let rv: null | string = null

    if (usePrimary) {
      rv = await this.primaryClient.client.get(key)
    } else {
      rv = await this.secondaryClient.client.get(key)
    }

    if (rv === null) {
      return null
    }

    return JSON.parse(rv) as TValue
  }

  async getRefreshTokenTaskResult(refreshToken: string, usePrimary = false) {
    return this.getJSONValue<RefreshTokenTaskResult>(
      KeyFactory.refreshTokenTask(refreshToken),
      usePrimary,
    )
  }

  async getAuthContextInfo(userId: string, usePrimary = false) {
    return this.getJSONValue<AuthContextDataInternalSerialized>(
      KeyFactory.authContextInfo(userId),
      usePrimary,
    )
  }

  async setRefreshTokenTaskResult(
    refreshToken: string,
    result: RefreshTokenTaskResult,
    ttlSeconds: number,
  ) {
    const cacheKey = KeyFactory.refreshTokenTask(refreshToken)
    const rv = await this.primaryClient.client.set(
      cacheKey,
      JSON.stringify(result),
      'EX',
      ttlSeconds,
      'NX',
    )

    return rv === 'OK'
  }

  async setAuthContextInfo(payload: AuthContextDataInternalSerialized) {
    const rv = await this.primaryClient.client.set(
      KeyFactory.authContextInfo(payload.user._id),
      JSON.stringify(payload),
      'EX',
      this.authConfig.AUTH_JWT_ACCESS_TOKEN_EXPIRE_SECONDS,
    )

    if (rv !== 'OK') {
      return false
    }

    return this.primaryClient.synchronize()
  }
}
