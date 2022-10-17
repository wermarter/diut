import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'
import { TestCategoryResponseDto } from 'src/resources/test-categories/dtos/test-category.response-dto'

export class TestResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    type: TestCategoryResponseDto,
  })
  category: TestCategoryResponseDto

  @Expose()
  @ApiProperty({
    example: 'Tên XN',
  })
  name: string

  @Expose()
  @ApiProperty({
    example: 2,
  })
  topBottomIndex: number
}
