import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { TestCategoryCreateRequestDto } from './create.request-dto'
import { exampleTestCategory } from 'src/domain'
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
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branch?: BranchUnpopulatedResponseDto
}
