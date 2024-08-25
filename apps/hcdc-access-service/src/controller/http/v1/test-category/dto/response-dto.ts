import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { TestCategoryCreateRequestDto } from './create.request-dto'
import { exampleTestCategory } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class TestCategoryUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestCategoryCreateRequestDto,
) {}

export class TestCategoryResponseDto extends TestCategoryUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleTestCategory.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
