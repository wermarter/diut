import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CacheGetRequestDto {
  @ApiProperty({
    default: 'test_redis_key',
  })
  @IsString()
  key: string
}

export class CacheSetRequestDto {
  @ApiProperty({
    default: 'test_redis_key',
  })
  @IsString()
  key: string

  @ApiProperty({
    default: 'success!!!',
  })
  value: unknown
}
