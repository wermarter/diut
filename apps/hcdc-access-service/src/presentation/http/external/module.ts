import { Module } from '@nestjs/common'
import { concatModuleMetadata } from '@diut/nestjs-infra'
import { ClassConstructor } from 'class-transformer'

import { ExternalController } from './controller'
import { AuthServiceToken, IAuthService } from 'src/domain'
import { commonModuleMetadata } from '../common'
import { HttpExternalAuthService } from './auth'

@Module(
  concatModuleMetadata([
    ...commonModuleMetadata,
    {
      providers: [
        HttpExternalAuthService,
        {
          provide: AuthServiceToken,
          useExisting:
            HttpExternalAuthService satisfies ClassConstructor<IAuthService>,
        },
      ],
      controllers: [ExternalController],
    },
  ]),
)
export class HttpExternalModule {}
