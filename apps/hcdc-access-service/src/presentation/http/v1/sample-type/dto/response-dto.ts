import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-core'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { SampleTypeCreateRequestDto } from './create.request-dto'
import { exampleSampleType } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class SampleTypeUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  SampleTypeCreateRequestDto,
) {}

export class SampleTypeResponseDto extends SampleTypeUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleSampleType.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
