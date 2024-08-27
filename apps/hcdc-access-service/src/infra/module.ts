import { concatModuleMetadata } from '@diut/nestjs-infra'
import { JwtModule } from '@nestjs/jwt'

import { authMetadata } from './auth'
import { winstonMetadata } from './winston'
import { minioMetadata } from './minio'
import { mongoMetadata } from './mongo'
import { browserServiceMetadata } from './browser-service'
import { redisMetadata } from './redis'

export const infraMetadata = concatModuleMetadata([
  { imports: [JwtModule.register({})] },
  authMetadata,
  winstonMetadata,
  minioMetadata,
  redisMetadata,
  mongoMetadata,
  browserServiceMetadata,
])
