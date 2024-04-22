import { concatModuleMetadata } from '@diut/nestjs-infra'

import { authMetadata } from './auth'
import { logMetadata } from './log'
import { minioMetadata } from './minio'
import { mongoMetadata } from './mongo'
import { externalServiceMetadata } from './external-service'
import { redisMetadata } from './redis'

export const infraMetadata = concatModuleMetadata([
  authMetadata,
  logMetadata,
  minioMetadata,
  redisMetadata,
  mongoMetadata,
  externalServiceMetadata,
])
