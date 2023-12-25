import { DomainErrorCode } from '@diut/levansy-common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class HttpErrorResponse {
  @Expose()
  @ApiProperty({ enum: DomainErrorCode })
  @IsEnum(DomainErrorCode)
  errorCode: DomainErrorCode

  @Expose()
  @ApiProperty()
  @IsString()
  message: string

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stack?: string
}
