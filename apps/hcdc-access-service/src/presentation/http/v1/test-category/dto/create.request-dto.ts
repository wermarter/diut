import { IsObjectId } from '@diut/nestjs-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleTestCategory } from 'src/domain'

export class TestCategoryCreateRequestDto {
  @Expose()
  @ApiProperty(exampleTestCategory.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

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

  @Expose()
  @ApiProperty(exampleTestCategory.branchId)
  @IsObjectId()
  branchId: string
}
