import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { exampleTestElement } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'
import { TestElementRequestDto } from './request-dto'

export class TestElementUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestElementRequestDto,
) {}

export class TestElementResponseDto extends TestElementUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleTestElement.test,
    type: () => TestUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  test?: TestUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTestElement.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
