import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleTestCategory } from 'src/domain'

export class TestCategoryCreateRequestDto {
  @ApiProperty(exampleTestCategory.index)
  @IsNumber()
  @Min(1)
  index: number

  @ApiProperty(exampleTestCategory.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty(exampleTestCategory.reportIndex)
  @IsNumber()
  @Min(1)
  reportIndex: number
}
