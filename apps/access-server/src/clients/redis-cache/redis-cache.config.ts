import { Type } from 'class-transformer'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export const REDIS_CACHE_CONFIG_NAME = 'cache'

export class RedisCacheConfig {
  @IsString()
  @IsNotEmpty()
  host: string

  @Type(() => Number)
  @IsNumber()
  port: number
}
