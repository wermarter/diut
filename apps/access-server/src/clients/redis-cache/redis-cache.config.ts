import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export const REDIS_CACHE_CONFIG_NAME = 'cache'

export class RedisCacheConfig {
  @IsString()
  @IsNotEmpty()
  host: string

  @IsNumber()
  port: number
}
