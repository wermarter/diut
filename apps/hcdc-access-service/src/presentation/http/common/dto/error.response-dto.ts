import { DomainErrorCode } from '@diut/hcdc'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsString } from 'class-validator'

export class HttpErrorResponse {
  @Expose()
  @ApiProperty({ enum: DomainErrorCode })
  @IsEnum(DomainErrorCode)
  errorCode: DomainErrorCode

  @Expose()
  @ApiProperty()
  @IsString()
  message: string
}
