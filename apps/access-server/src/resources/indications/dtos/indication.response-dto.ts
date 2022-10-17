import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class IndicationResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Kiểm tra sức khỏe',
  })
  name: string
}
