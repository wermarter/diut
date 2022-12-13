import { Type } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

export const MONGO_CONFIG_NAME = 'mongo'

export class MongoConfig {
  @IsString()
  uri: string

  @Type(() => Number)
  @IsNumber()
  retryAttempts: number
}
