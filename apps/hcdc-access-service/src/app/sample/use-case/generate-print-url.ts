import { AuthSubject, SampleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { assertPermission } from 'src/app/auth/common'
import { AppConfig, loadAppConfig } from 'src/config'
import {
  AUTH_CACHE_SERVICE_TOKEN,
  AUTH_CONTEXT_TOKEN,
  AuthExternalOrigin,
  AuthPayloadExternal,
  IAuthCacheService,
  IAuthContext,
} from 'src/domain'
import { SamplePrintOptions } from '../common'
import { SampleAssertExistsUseCase } from './assert-exists'

@Injectable()
export class SampleGeneratePrintUrlUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly jwtService: JwtService,
    @Inject(AUTH_CACHE_SERVICE_TOKEN)
    private readonly cacheService: IAuthCacheService,
  ) {}

  async execute(input: { printOptions: SamplePrintOptions[] }) {
    const { ability, user, permissions } = this.authContext.getDataInternal()
    const route = '/api/external/print-sample-result'

    const jwt = await this.jwtService.signAsync(
      <AuthPayloadExternal>{
        printOptions: input.printOptions,
        authorizedByUserId: user._id,
        authorizedRoute: route,
        description: SampleGeneratePrintUrlUseCase.name,
        origin: AuthExternalOrigin.Delegated,
        permissions,
        routeOptions: input.printOptions,
      },
      {
        secret: this.appConfig.EXTERNAL_JWT_SECRET,
        expiresIn: this.appConfig.EXTERNAL_JWT_EXPIRE_SECONDS,
      },
    )

    for (const printOptions of input.printOptions) {
      const entity = await this.sampleAssertExistsUseCase.execute({
        _id: printOptions.sampleId,
      })
      assertPermission(
        ability,
        AuthSubject.Sample,
        SampleAction.GeneratePrintUrl,
        entity,
      )

      await this.cacheService.setActiveExternalToken(
        user._id,
        printOptions.sampleId,
        jwt,
      )
    }

    return `${this.appConfig.EXTERNAL_URL_PREFIX}${route}?jwt=${jwt}`
  }
}
