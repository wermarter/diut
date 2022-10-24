import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class SampleResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'sometext',
  })
  name: string
}
