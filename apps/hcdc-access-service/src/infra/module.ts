import { concatModuleMetadata } from '@diut/nestjs-infra'
import { JwtModule } from '@nestjs/jwt'

import { authMetadata } from './auth'
import { browserServiceMetadata } from './browser-service'
import { minioMetadata } from './minio'
import { mongoMetadata } from './mongo'
import { redisMetadata } from './redis'
import { winstonMetadata } from './winston'

export const infraMetadata = concatModuleMetadata([
  { imports: [JwtModule.register({})] },
  authMetadata,
  winstonMetadata,
  minioMetadata,
  redisMetadata,
  mongoMetadata,
  browserServiceMetadata,
])
