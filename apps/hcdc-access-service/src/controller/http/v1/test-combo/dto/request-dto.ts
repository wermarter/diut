import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleTestCombo } from '../../../shared'

export class TestComboRequestDto {
  @Expose()
  @ApiProperty(exampleTestCombo.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleTestCombo.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleTestCombo.testIds)
  @IsObjectId({ each: true })
  @IsArray()
  testIds: string[]

  @Expose()
  @ApiProperty(exampleTestCombo.branchId)
  @IsObjectId()
  branchId: string
}
