import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class IndicationResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Kiểm tra sức khỏe',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
