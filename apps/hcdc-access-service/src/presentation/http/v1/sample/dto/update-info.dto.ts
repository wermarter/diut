import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import {
  BaseResourceResponseDto,
  IsObjectId,
  exampleMongoObjectIds,
} from '@diut/nestjs-core'
import { Expose } from 'class-transformer'
import { IsOptional } from 'class-validator'

import { SampleRequestDto } from './request-dto'
import { sampleInfoFieldNames } from 'src/domain'
import { OmittedSampleResponseDto } from './response-dto'

class SampleInfoDto extends PickType(SampleRequestDto, [
  ...sampleInfoFieldNames,
  'isConfirmed',
]) {}

export class SampleUpdateInfoRequestDto extends PartialType(SampleInfoDto) {
  @Expose()
  @ApiPropertyOptional(exampleMongoObjectIds)
  @IsOptional()
  @IsObjectId({ each: true })
  addedTestIds?: string[]

  @Expose()
  @ApiPropertyOptional(exampleMongoObjectIds)
  @IsOptional()
  @IsObjectId({ each: true })
  removedTestIds?: string[]
}

export class SampleUpdateInfoResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  SampleInfoDto,
  PickType(OmittedSampleResponseDto, ['results']),
) {}
