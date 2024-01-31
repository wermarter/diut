import { PatientCategory } from '@diut/hcdc'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

import { IsObjectId } from '@diut/nestjs-infra'
import { DISABLED_REPORT_ORDER } from '../test-element.common'

export class CreateTestElementRequestDto {
  @ApiProperty({
    example: 'WBC123',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  test: string

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  index: number

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  printIndex: number

  @ApiProperty({
    example: 2,
    description: `${DISABLED_REPORT_ORDER}:disabled, 1-*:normal order`,
  })
  @IsNumber()
  @Min(DISABLED_REPORT_ORDER)
  reportOrder: number

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isParent: boolean

  @ApiProperty({
    type: () => HighlightRuleDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HighlightRuleDto)
  highlightRules: HighlightRuleDto[]

  @ApiProperty({
    example: '10^3/uL',
    required: false,
  })
  @IsOptional()
  @IsString()
  unit?: string
}

export class HighlightRuleDto {
  @Expose()
  @ApiProperty({
    example: PatientCategory.Any,
    enum: PatientCategory,
  })
  @IsEnum(PatientCategory)
  category: PatientCategory

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  defaultChecked: boolean

  @Expose()
  @ApiProperty({
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  min?: number

  @Expose()
  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  max?: number

  @Expose()
  @ApiProperty({
    example: 'Neg',
    required: false,
  })
  @IsOptional()
  @IsString()
  normalValue?: string

  @Expose()
  @ApiProperty({
    example: '...',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string

  @Expose()
  @ApiProperty({
    example: '...',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string
}
