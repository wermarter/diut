import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class TestComboResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Combo Sinh hoá',
  })
  name: string

  @Expose()
  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  children: string[]
}
