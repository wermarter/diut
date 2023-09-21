import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { BaseResourceResponseDto } from '@diut/server-core'

export class PatientTypeResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Bảo hiểm y tế',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  index: number
}
