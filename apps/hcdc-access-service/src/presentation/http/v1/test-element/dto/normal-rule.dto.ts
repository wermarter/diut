import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

import { PatientCategory, exampleTestElement } from 'src/domain'

const exampleNormalRule = exampleTestElement.normalRules.example[0]

export class TestElementNormalRuleDto {
  @Expose()
  @ApiProperty({ example: exampleNormalRule.category })
  @IsEnum(PatientCategory)
  category: PatientCategory

  @Expose()
  @ApiProperty({ required: false, example: exampleNormalRule.defaultChecked })
  @IsOptional()
  @IsBoolean()
  defaultChecked?: boolean

  @Expose()
  @ApiProperty({ required: false, example: exampleNormalRule.normalValue })
  @IsOptional()
  @IsString()
  normalValue?: string

  @Expose()
  @ApiProperty({ required: false, example: exampleNormalRule.normalLowerBound })
  @IsOptional()
  @IsNumber()
  normalLowerBound?: number

  @Expose()
  @ApiProperty({ required: false, example: exampleNormalRule.normalUpperBound })
  @IsOptional()
  @IsNumber()
  normalUpperBound?: number

  @Expose()
  @ApiProperty({ example: exampleNormalRule.description })
  @IsString()
  description: string

  @Expose()
  @ApiProperty({ example: exampleNormalRule.note })
  @IsString()
  note: string
}
