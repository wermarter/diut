import { IsObjectId } from '@diut/nestjs-infra'
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
import { exampleTestElement } from '../../../shared'
import { TestElementNormalRuleDto } from './normal-rule.dto'

export class TestElementRequestDto {
  @Expose()
  @ApiProperty(exampleTestElement.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleTestElement.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleTestElement.printIndex)
  @IsNumber()
  @Min(0)
  printIndex: number

  @Expose()
  @ApiProperty(exampleTestElement.reportIndex)
  @IsNumber()
  @Min(0)
  reportIndex: number

  @Expose()
  @ApiProperty(exampleTestElement.unit)
  @IsString()
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
