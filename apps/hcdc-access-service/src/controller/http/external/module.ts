import { Module } from '@nestjs/common'
import { concatModuleMetadata } from '@diut/nestjs-infra'

import { ExternalController } from './controller'
import { AUTH_SERVICE_TOKEN } from 'src/domain'
import { commonModuleMetadata } from '../shared'
import { AuthServiceHttpExternal } from './auth'

@Module(
  concatModuleMetadata([
    ...commonModuleMetadata,
    {
      providers: [
        AuthServiceHttpExternal,
        {
          provide: AUTH_SERVICE_TOKEN,
          useExisting: AuthServiceHttpExternal,
        },
      ],
      controllers: [ExternalController],
    },
  ]),
)
export class HttpExternalModule {}
