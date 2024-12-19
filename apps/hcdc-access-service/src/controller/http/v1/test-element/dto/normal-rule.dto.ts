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
  @IsBoolean()
  @IsOptional()
  defaultChecked?: boolean

  @Expose()
  @ApiProperty(exampleNormalRule.normalValue)
  @IsString()
  @IsOptional()
  normalValue?: string

  @Expose()
  @ApiProperty(exampleNormalRule.normalLowerBound)
  @IsNumber()
  @IsOptional()
  normalLowerBound?: number

  @Expose()
  @ApiProperty(exampleNormalRule.normalUpperBound)
  @IsNumber()
  @IsOptional()
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
