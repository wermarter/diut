import { concatModuleMetadata } from '@diut/nestjs-infra'
import { JwtModule } from '@nestjs/jwt'

import { authMetadata } from './auth'
import { logMetadata } from './pino'
import { minioMetadata } from './minio'
import { mongoMetadata } from './mongo'
import { browserServiceMetadata } from './browser-service'
import { redisMetadata } from './redis'

export const infraMetadata = concatModuleMetadata([
  { imports: [JwtModule.register({})] },
  authMetadata,
  logMetadata,
  minioMetadata,
  redisMetadata,
  mongoMetadata,
  browserServiceMetadata,
])
