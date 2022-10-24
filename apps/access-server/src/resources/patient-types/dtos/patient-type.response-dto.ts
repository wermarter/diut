import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class PatientTypeResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Bảo hiểm y tế',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
