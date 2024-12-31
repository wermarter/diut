import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { exampleSampleType } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { SampleTypeRequestDto } from './request-dto'

export class SampleTypeUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  SampleTypeRequestDto,
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
  branch?: BranchUnpopulatedResponseDto
}
