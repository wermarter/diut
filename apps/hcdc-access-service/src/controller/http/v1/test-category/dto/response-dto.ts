import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { exampleTestCategory } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestCategoryRequestDto } from './request-dto'

export class TestCategoryUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestCategoryRequestDto,
) {}

export class TestCategoryResponseDto extends TestCategoryUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleTestCategory.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
