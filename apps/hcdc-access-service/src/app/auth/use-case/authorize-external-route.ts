import { AuthSubject, ExternalRouteAction, ExternalRoutePath } from '@diut/hcdc'
import { Inject, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppConfig, loadAppConfig } from 'src/config'
import {
  AUTH_CONTEXT_TOKEN,
  AuthPayloadExternal,
  ExternalRouteOptions,
  IAuthContext,
} from 'src/domain'
import { assertPermission } from '../common'

export class AuthAuthorizeExternalRouteUseCase {
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    private readonly JwtService: JwtService,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  async execute<TPath extends ExternalRoutePath>(
    description: string,
    path: TPath,
    routeOptions: ExternalRouteOptions[TPath],
    branchIds: string[],
  ) {
    const { ability, user } = this.authContext.getDataInternal()
    for (const branchId of branchIds) {
      assertPermission(
        ability,
        AuthSubject.ExternalRoute,
        ExternalRouteAction.Generate,
        { branchId, path },
      )
    }

    const payload: AuthPayloadExternal = {
      description,
      authorizedByUserId: user._id,
      path,
      routeOptions,
    }

    const jwt = await this.JwtService.signAsync(payload, {
      secret: this.appConfig.EXTERNAL_JWT_SECRET,
      expiresIn: this.appConfig.EXTERNAL_JWT_EXPIRE_SECONDS,
    })

    this.logger.log({ description, path, routeOptions, branchIds, jwt })

    return {
      jwt,
      path: `/api/external/${path}?jwt=${jwt}`,
    }
  }
}
