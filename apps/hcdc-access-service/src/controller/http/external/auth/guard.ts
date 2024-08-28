import { createAbility } from '@diut/hcdc'
import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { AppConfig, loadAppConfig } from 'src/config'
import {
  AUTH_CACHE_SERVICE_TOKEN,
  AUTH_CONTEXT_TOKEN,
  AuthPayloadExternal,
  AuthType,
  IAuthCacheService,
  IAuthContext,
} from 'src/domain'

export class HttpExternalAuthGuard implements CanActivate {
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(AUTH_CACHE_SERVICE_TOKEN)
    private readonly cacheService: IAuthCacheService,
    private readonly jwtService: JwtService,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()
    const jwt = request.query.jwt as string
    if (!jwt) return false

    const payload = await this.verifyToken(jwt)
    if (!payload) return false

    if (!request.path.startsWith(payload.authorizedRoute)) return false

    if (await this.cacheService.isExternalTokenBlacklisted(jwt)) return false

    this.authContext.setData({
      ...payload,
      type: AuthType.External,
      jwt,
      ability: createAbility(payload.permissions),
    })

    return true
  }

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
}
