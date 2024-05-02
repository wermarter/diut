import { Inject, Injectable } from '@nestjs/common'
import { SampleAction, AuthSubject } from '@diut/hcdc'
import { MongoAbility } from '@casl/ability'
import { JwtService } from '@nestjs/jwt'

import {
  AuthContextToken,
  AuthExternalOrigin,
  AuthPayloadExternal,
  CacheKeyFactory,
  CachePrimaryServiceToken,
  IAuthContext,
  ICachePrimaryService,
  assertPermission,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'
import { AppConfig, loadAppConfig } from 'src/config'
import { SamplePrintOptions } from '../print-strategy/context'

@Injectable()
export class SampleGeneratePrintUrlUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly jwtService: JwtService,
    @Inject(CachePrimaryServiceToken)
    private readonly cacheService: ICachePrimaryService,
  ) {}

  async execute(input: {
    ability: MongoAbility
    printOptions: SamplePrintOptions[]
  }) {
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

      // keep track for invalidation
      await this.cacheService.client.set(
        CacheKeyFactory.activeExternalToken(
          user._id,
          printOptions.sampleId,
          jwt,
        ),
        '1',
        'EX',
        this.appConfig.EXTERNAL_JWT_EXPIRE_SECONDS,
      )
    }

    return `${this.appConfig.EXTERNAL_URL_PREFIX}${route}?jwt=${jwt}`
  }
}
