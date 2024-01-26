import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { SampleTypeCreateRequestDto } from './create.request-dto'
import { Branch, exampleSampleType } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class SampleTypeUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  SampleTypeCreateRequestDto,
) {}

export class SampleTypeResponseDto extends SampleTypeUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({ ...exampleSampleType.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
