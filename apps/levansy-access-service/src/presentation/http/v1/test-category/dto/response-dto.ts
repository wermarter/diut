import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { BaseResourceResponseDto } from '@diut/nest-core'

import { exampleTestCategory } from 'src/domain'

export class TestCategoryResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty(exampleTestCategory.index)
  @IsNumber()
  @Min(1)
  index: number

  @Expose()
  @ApiProperty(exampleTestCategory.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleTestCategory.reportIndex)
  @IsNumber()
  @Min(1)
  reportIndex: number
}
