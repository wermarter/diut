import { PatientCategory } from '@diut/hcdc'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

import { exampleNormalRule } from '../../../shared'

export class TestElementNormalRuleDto {
  @Expose()
  @ApiProperty(exampleNormalRule.category)
  @IsEnum(PatientCategory)
  category: PatientCategory

  @Expose()
  @ApiProperty(exampleNormalRule.defaultChecked)
  @IsOptional()
  @IsBoolean()
  defaultChecked?: boolean

  @Expose()
  @ApiProperty(exampleNormalRule.normalValue)
  @IsOptional()
  @IsString()
  normalValue?: string

  @Expose()
  @ApiProperty(exampleNormalRule.normalLowerBound)
  @IsOptional()
  @IsNumber()
  normalLowerBound?: number

  @Expose()
  @ApiProperty(exampleNormalRule.normalUpperBound)
  @IsOptional()
  @IsNumber()
  normalUpperBound?: number

  @Expose()
  @ApiProperty(exampleNormalRule.description)
  @IsString()
  description: string

  @Expose()
  @ApiProperty(exampleNormalRule.note)
  @IsString()
  note: string
}
