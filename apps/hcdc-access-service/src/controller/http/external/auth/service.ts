import { Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AppConfig, loadAppConfig } from 'src/config'
import {
  AuthContextData,
  AuthPayloadExternal,
  AuthType,
  CacheKeyFactory,
  CachePrimaryServiceToken,
  CacheSecondaryServiceToken,
  EAuthzContextInvalid,
  IAuthService,
  ICachePrimaryService,
  ICacheSecondaryService,
} from 'src/domain'

@Injectable()
export class HttpExternalAuthService implements IAuthService {
  private readonly logger = new Logger(HttpExternalAuthService.name)

  constructor(
    @Inject(CachePrimaryServiceToken)
    private readonly cacheService: ICachePrimaryService,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    @Inject(CacheSecondaryServiceToken)
    private readonly cacheSecondaryService: ICacheSecondaryService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyToken(jwt: string) {
    try {
      return await this.jwtService.verifyAsync<AuthPayloadExternal>(jwt, {
        secret: this.appConfig.EXTERNAL_JWT_SECRET,
      })
    } catch (error) {
      this.logger.error(error)
      return null
    }
  }

  async invalidate(context: AuthContextData) {
    if (context.type !== AuthType.External) {
      throw new EAuthzContextInvalid(`type=${context.type}`)
    }

    await this.setBlacklisted(context.jwt)
  }

  async setBlacklisted(jwt: string) {
    const rv = await this.cacheService.client.set(
      CacheKeyFactory.externalTokenBlacklist(jwt),
      '1',
      'EX',
      this.appConfig.EXTERNAL_JWT_EXPIRE_SECONDS,
      'NX',
    )

    if (rv === 'OK') {
      await this.cacheService.synchronize()
    } else {
      this.logger.warn('token blacklist existed')
    }
  }

  async checkBlacklisted(jwt: string) {
    const rv = await this.cacheSecondaryService.client.exists(
      CacheKeyFactory.externalTokenBlacklist(jwt),
    )

    return rv !== 0
  }
}
