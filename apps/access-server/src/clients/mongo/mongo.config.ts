import { IsNumber, IsString } from 'class-validator'

export const MONGO_CONFIG_NAME = 'mongo'

export class MongoConfig {
  @IsString()
  uri: string

  @IsNumber()
  retryAttempts: number
}
