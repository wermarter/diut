import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { TestCategoryCreateRequestDto } from './create.request-dto'
import { Branch, exampleTestCategory } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class TestCategoryUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestCategoryCreateRequestDto,
) {}

export class TestCategoryResponseDto extends TestCategoryUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({ ...exampleTestCategory.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
