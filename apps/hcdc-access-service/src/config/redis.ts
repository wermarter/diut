import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsNumber, IsString, MinLength } from 'class-validator'

export class RedisConfig {
  @Expose()
  @MinLength(3)
  @IsString()
  REDIS_MASTER_GROUP_NAME: string

  @Expose()
  @MinLength(3)
  @IsString()
  REDIS_SENTINEL_HOST: string

  @Expose()
  @IsNumber()
  REDIS_SENTINEL_PORT: number

  @Expose()
  @IsNumber()
  REDIS_REPLICAS_COUNT: number
}

export const loadRedisConfig = makeConfigLoader(RedisConfig)
