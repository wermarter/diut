import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'

export class MongoConfig {
  @Expose()
  @MinLength(3)
  @IsString()
  MONGO_URI: string
}

export const loadMongoConfig = makeConfigLoader(MongoConfig)
