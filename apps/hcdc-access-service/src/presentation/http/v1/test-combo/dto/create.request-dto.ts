import { IsObjectId } from '@diut/nestjs-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleTestCombo } from 'src/domain'

export class TestComboCreateRequestDto {
  @Expose()
  @ApiProperty(exampleTestCombo.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleTestCombo.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleTestCombo.testIds)
  @IsArray()
  @IsObjectId({ each: true })
  testIds: string[]

  @Expose()
  @ApiProperty(exampleTestCombo.branchId)
  @IsObjectId()
  branchId: string
}
