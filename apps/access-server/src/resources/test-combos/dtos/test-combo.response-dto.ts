import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto, ExposeObjectId } from 'src/clients/mongo'

export class TestComboResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Combo Sinh hoá',
  })
  name: string

  @ExposeObjectId()
  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  children: string[]
}
