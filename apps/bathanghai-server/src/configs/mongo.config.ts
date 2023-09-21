// import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/server-core'
import { IsString, MinLength } from 'class-validator'

export class MongoConfig {
  @IsString()
  @MinLength(3)
  MONGO_URI: string
}

export const loadMongoConfig = makeConfigLoader(MongoConfig)
