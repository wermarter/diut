import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class TestCategoryResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'XN Huyết học - Đông máu',
  })
  name: string

  @Expose()
  @ApiProperty({
    example: 2,
  })
  leftRightIndex: number
}
