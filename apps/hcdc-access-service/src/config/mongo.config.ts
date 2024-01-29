import { makeConfigLoader } from '@diut/nestjs-core'
import { Expose } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'
import { registerAs } from '@nestjs/config'

export class MongoConfig {
  @Expose()
  @IsString()
  @MinLength(3)
  MONGO_URI: string
}

export const loadMongoConfig = makeConfigLoader(MongoConfig)
