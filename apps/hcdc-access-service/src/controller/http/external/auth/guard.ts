import { createAbility } from '@diut/hcdc'
import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { AuthPopulateContextUseCase } from 'src/app/auth/use-case/populate-context'
import { AppConfig, loadAppConfig } from 'src/config'
import {
  AUTH_CACHE_SERVICE_TOKEN,
  AUTH_CONTEXT_TOKEN,
  AuthPayloadExternal,
  AuthType,
  EAuthn,
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
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()
    const jwt = request.query.jwt as string
    if (!jwt) return false

    const payload = await this.verifyToken(jwt)
    if (!payload) return false

    const requestPath = request.path.split('/').at(-1)
    if (requestPath !== payload.path) {
      throw new EAuthn(
        undefined,
        `Invalid path ${payload.path} in token. Expected ${requestPath}`,
      )
    }

    if (await this.cacheService.isExternalTokenBlacklisted(jwt)) return false

    const { compiledPermissions } =
      await this.authPopulateContextUseCase.execute({
        userId: payload.authorizedByUserId,
      })

    this.authContext.setData({
      ...payload,
      type: AuthType.External,
      jwt,
      ability: createAbility(compiledPermissions),
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
