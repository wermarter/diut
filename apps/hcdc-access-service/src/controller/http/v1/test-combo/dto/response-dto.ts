import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'

import { exampleTestCombo } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'
import { TestComboRequestDto } from './request-dto'

export class TestComboUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestComboRequestDto,
) {}

export class TestComboResponseDto extends TestComboUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleTestCombo.tests,
    type: () => TestUnpopulatedResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestUnpopulatedResponseDto)
  @IsOptional()
  tests?: TestUnpopulatedResponseDto[]

  @Expose()
  @ApiProperty({
    ...exampleTestCombo.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
