import { concatModuleMetadata } from '@diut/nestjs-infra'
import { JwtModule } from '@nestjs/jwt'

import { browserServiceMetadata } from './browser-service'
import { clsMetadata } from './cls'
import { minioMetadata } from './minio'
import { mongoMetadata } from './mongo'
import { pinoMetadata } from './pino'
import { redisMetadata } from './redis'
import { winstonMetadata } from './winston'

export const infraMetadata = concatModuleMetadata([
  { imports: [JwtModule.register({})] },
  clsMetadata,
  pinoMetadata,
  winstonMetadata,
  minioMetadata,
  redisMetadata,
  mongoMetadata,
  browserServiceMetadata,
])
