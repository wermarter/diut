import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import { BaseResourceResponseDto, IsObjectId } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsArray, IsOptional } from 'class-validator'
import { exampleMongoObjectIds } from '@diut/common'
import { sampleInfoFieldNames } from '@diut/hcdc'

import { SampleRequestDto } from './request-dto'
import { OmittedSampleResponseDto } from './response-dto'

class SampleInfoDto extends PickType(SampleRequestDto, [
  ...sampleInfoFieldNames,
  'isConfirmed',
]) {}

export class SampleUpdateInfoRequestDto extends PartialType(SampleInfoDto) {
  @Expose()
  @ApiPropertyOptional(exampleMongoObjectIds)
  @IsObjectId({ each: true })
  @IsArray()
  @IsOptional()
  addedTestIds?: string[]

  @Expose()
  @ApiPropertyOptional(exampleMongoObjectIds)
  @IsObjectId({ each: true })
  @IsArray()
  @IsOptional()
  removedTestIds?: string[]
}

export class SampleUpdateInfoResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  SampleInfoDto,
  PickType(OmittedSampleResponseDto, ['results']),
) {}