import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { TestElementCreateRequestDto } from './create.request-dto'
import { exampleTestElement } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'
import { TestResponseDto } from '../../test/dto/response-dto'

export class TestElementUnpopulatedResponse extends IntersectionType(
  BaseResourceResponseDto,
  TestElementCreateRequestDto,
) {}

export class TestElementResponseDto extends TestElementUnpopulatedResponse {
  @Expose()
  @ApiProperty({ ...exampleTestElement.test, type: () => TestResponseDto })
  @ValidateNested({ each: true })
  @Type(() => TestResponseDto)
  test?: TestResponseDto

  @Expose()
  @ApiProperty({ ...exampleTestElement.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: BranchResponseDto
}
