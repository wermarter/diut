import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'
import { TestResponseDto } from 'src/resources/tests/dtos/test.response-dto'
import { HighlightRuleDto } from './create-test-element.request-dto'

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
    type: () => HighlightRuleDto,
    isArray: true,
  })
  highlightRules: HighlightRuleDto[]

  @Expose()
  @ApiProperty({
    example: '10^3/uL',
    required: false,
  })
  unit?: string
}
