import { concatModuleMetadata } from '@diut/nestjs-infra'
import { Module } from '@nestjs/common'

import { AUTH_SERVICE_TOKEN } from 'src/domain'
import { commonModuleMetadata } from '../shared'
import { AuthServiceHttpExternal } from './auth'
import { ExternalController } from './controller'

@Module(
  concatModuleMetadata([
    ...commonModuleMetadata,
    {
      providers: [
        {
          provide: AUTH_SERVICE_TOKEN,
          useClass: AuthServiceHttpExternal,
        },
      ],
      controllers: [ExternalController],
    },
  ]),
)
export class HttpExternalModule {}
