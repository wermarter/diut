import { concatModuleMetadata } from '@diut/nestjs-infra'
import { JwtModule } from '@nestjs/jwt'

import { authMetadata } from './auth'
import { logMetadata } from './log'
import { minioMetadata } from './minio'
import { mongoMetadata } from './mongo'
import { externalServiceMetadata } from './external-service'
import { redisMetadata } from './redis'

export const infraMetadata = concatModuleMetadata([
  { imports: [JwtModule.register({})] },
  authMetadata,
  logMetadata,
  minioMetadata,
  redisMetadata,
  mongoMetadata,
  externalServiceMetadata,
])
