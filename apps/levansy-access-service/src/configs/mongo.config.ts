import { makeConfigLoader } from '@diut/nest-core'
import { IsString, MinLength } from 'class-validator'

export class MongoConfig {
  @IsString()
  @MinLength(3)
  MONGO_URI: string
}

export const loadMongoConfig = makeConfigLoader(MongoConfig)
