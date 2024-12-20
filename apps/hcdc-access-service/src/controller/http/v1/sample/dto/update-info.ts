import { exampleMongoObjectIds } from '@diut/common'
import { sampleInfoFieldNames } from '@diut/hcdc'
import { BaseResourceResponseDto, IsObjectId } from '@diut/nestjs-infra'
import {
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsArray, IsOptional } from 'class-validator'
import { SampleRequestDto } from './request-dto'
import { OmittedSampleResponseDto } from './response-dto'

class SampleInfoDto extends PickType(SampleRequestDto, [
  ...sampleInfoFieldNames,
  'isConfirmed',
  'isLocked',
]) {}

export class SampleUpdateInfoRequestDto extends OmitType(
  PartialType(SampleInfoDto),
  ['isLocked'],
) {
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
