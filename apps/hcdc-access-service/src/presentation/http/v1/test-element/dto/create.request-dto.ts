import { IsObjectId } from '@diut/nest-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

import { exampleTestElement } from 'src/domain'
import { TestElementNormalRuleDto } from './normal-rule.dto'

export class TestElementCreateRequestDto {
  @Expose()
  @ApiProperty(exampleTestElement.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleTestElement.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleTestElement.printIndex)
  @IsNumber()
  @Min(1)
  printIndex: number

  @Expose()
  @ApiProperty(exampleTestElement.reportIndex)
  @IsNumber()
  @Min(1)
  reportIndex: number

  @Expose()
  @ApiProperty(exampleTestElement.unit)
  @IsString()
  @IsNotEmpty()
  unit: string

  @Expose()
  @ApiProperty(exampleTestElement.isParent)
  @IsBoolean()
  isParent: boolean

  @Expose()
  @ApiProperty({
    ...exampleTestElement.normalRules,
    type: () => TestElementNormalRuleDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestElementNormalRuleDto)
  normalRules: TestElementNormalRuleDto[]

  @Expose()
  @ApiProperty(exampleTestElement.testId)
  @IsObjectId()
  testId: string

  @Expose()
  @ApiProperty(exampleTestElement.branchId)
  @IsObjectId()
  branchId: string
}
