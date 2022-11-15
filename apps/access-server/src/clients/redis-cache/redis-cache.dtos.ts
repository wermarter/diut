import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CacheGetRequestDto {
  @ApiProperty({
    default: 'test_redis_key',
  })
  @IsString()
  key: string

  @ApiProperty({
    default: 'test_ns',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  namespace?: string
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

  @ApiProperty({
    default: 1000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ttl?: number

  @ApiProperty({
    default: 'test_ns',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  namespace?: string
}
