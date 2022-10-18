import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class SampleTypeResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Máu',
  })
  name: string

  @Expose()
  @ApiProperty({
    example: 2,
  })
  leftRightIndex: number
}
