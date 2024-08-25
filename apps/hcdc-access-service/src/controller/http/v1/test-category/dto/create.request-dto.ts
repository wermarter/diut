import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleTestCategory } from '../../../shared'

export class TestCategoryCreateRequestDto {
  @Expose()
  @ApiProperty(exampleTestCategory.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleTestCategory.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleTestCategory.reportIndex)
  @IsNumber()
  @Min(0)
  reportIndex: number

  @Expose()
  @ApiProperty(exampleTestCategory.branchId)
  @IsObjectId()
  branchId: string
}
