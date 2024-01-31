import {
  BaseResourceResponseDto,
  IsObjectId,
  exampleMongoObjectIds,
} from '@diut/nestjs-infra'
import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { SampleRequestDto } from './request-dto'
import { sampleInfoFieldNames } from 'src/domain'
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
