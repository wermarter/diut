import { PatientCategory } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

import { IsObjectId } from 'src/clients/mongo'

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
  topBottomIndex: number

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
}
