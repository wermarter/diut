import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { TestComboCreateRequestDto } from './create.request-dto'
import { Branch, Test, exampleTestCombo } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'
import { TestResponseDto } from '../../test/dto/response-dto'

export class TestComboUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestComboCreateRequestDto,
) {}

export class TestComboResponseDto extends TestComboUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleTestCombo.tests,
    type: () => TestResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestResponseDto)
  tests?: TestResponseDto[]

  @Expose()
  @ApiProperty({ ...exampleTestCombo.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
