import { BaseResourceResponseDto, IsObjectId } from '@diut/nestjs-infra'
import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { exampleMongoObjectIds } from '@diut/common'
import { sampleInfoFieldNames } from '@diut/hcdc'

import { SampleRequestDto } from './request-dto'
import { OmittedSampleResponseDto } from './response-dto'

export class SampleCreateRequestDto extends PickType(
  SampleRequestDto,
  sampleInfoFieldNames,
) {
  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsObjectId({ each: true })
  testIds: string[]
}

export class SampleCreateResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  OmitType(SampleCreateRequestDto, ['testIds']),
  PickType(OmittedSampleResponseDto, ['results']),
) {}
