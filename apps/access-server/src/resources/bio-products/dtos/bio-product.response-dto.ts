import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class BioProductResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'CHIV Advia centaur',
  })
  name: string

  @Expose()
  @ApiProperty({
    example: 2,
  })
  leftRightIndex: number
}
