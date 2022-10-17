import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'
import { TestResponseDto } from 'src/resources/tests/dtos/test.response-dto'

export class TestElementResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'WBC123',
  })
  name: string

  @Expose()
  @ApiProperty({
    type: TestResponseDto,
  })
  test: TestResponseDto

  @Expose()
  @ApiProperty({
    example: 2,
  })
  topBottomIndex: number

  @Expose()
  @ApiProperty({
    example: { any: { min: 0, max: 1, normalValue: 'positive' } },
  })
  highlightRule: object

  @ApiProperty({
    example: '10^3/uL',
    required: false,
  })
  unit?: string

  @ApiProperty({
    example: 'PR+NP >= 40%',
    required: false,
  })
  notice?: string
}
