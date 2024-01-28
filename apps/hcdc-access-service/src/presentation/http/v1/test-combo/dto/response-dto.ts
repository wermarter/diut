import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'

import { TestComboCreateRequestDto } from './create.request-dto'
import { exampleTestCombo } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'

export class TestComboUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestComboCreateRequestDto,
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
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
