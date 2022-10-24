import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class DoctorResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'BS. Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
