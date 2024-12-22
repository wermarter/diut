import { concatModuleMetadata } from '@diut/nestjs-infra'
import { JwtModule } from '@nestjs/jwt'
import { browserServiceMetadata } from './browser-service'
import { clsMetadata } from './cls'
import { mongoMetadata } from './mongo'
import { pinoMetadata } from './pino'
import { redisMetadata } from './redis'
import { s3Metadata } from './s3'

export const infraMetadata = concatModuleMetadata([
  { imports: [JwtModule.register({})] },
  clsMetadata,
  pinoMetadata,
  s3Metadata,
  redisMetadata,
  mongoMetadata,
  browserServiceMetadata,
])
