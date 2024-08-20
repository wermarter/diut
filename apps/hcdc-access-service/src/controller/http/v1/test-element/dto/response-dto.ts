import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { TestElementCreateRequestDto } from './create.request-dto'
import { exampleTestElement } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'

export class TestElementUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestElementCreateRequestDto,
) {}

export class TestElementResponseDto extends TestElementUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleTestElement.test,
    type: () => TestUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestUnpopulatedResponseDto)
  @IsOptional()
  test?: TestUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTestElement.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
