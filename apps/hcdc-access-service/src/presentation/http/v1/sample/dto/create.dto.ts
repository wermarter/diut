import { BaseResourceResponseDto, IsObjectId } from '@diut/nestjs-core'
import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { SampleRequestDto } from './request-dto'
import { SampleResponseDto } from './response-dto'

export class SampleCreateRequestDto extends PickType(SampleRequestDto, [
  'sampleId',
  'note',
  'isNgoaiGio',
  'isTraBuuDien',
  'infoAt',
  'sampledAt',
  'patientId',
  'doctorId',
  'patientTypeId',
  'diagnosisId',
  'originId',
  'sampleTypeIds',
  'branchId',
]) {
  @Expose()
  @ApiProperty({ isArray: true })
  @IsObjectId({ each: true })
  testIds: string[]
}

export class SampleCreateResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  OmitType(SampleCreateRequestDto, ['testIds']),
  PickType(SampleResponseDto, ['results']),
) {}
