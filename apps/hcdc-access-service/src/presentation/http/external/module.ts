import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { concatModuleMetadata } from '@diut/nestjs-infra'

import { ExternalController } from './controller'
import { AuthServiceToken, IAuthService } from 'src/domain'
import { HttpAuthService, commonModuleMetadata } from '../common'
import { ClassConstructor } from 'class-transformer'

@Module(
  concatModuleMetadata([
    ...commonModuleMetadata,
    {
      imports: [JwtModule.register({})],
      providers: [
        HttpAuthService,
        {
          provide: AuthServiceToken,
          useExisting: HttpAuthService satisfies ClassConstructor<IAuthService>,
        },
      ],
      controllers: [ExternalController],
    },
  ]),
)
export class HttpExternalModule {}
