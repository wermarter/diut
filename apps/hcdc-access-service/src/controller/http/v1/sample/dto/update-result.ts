import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { IntersectionType, PickType } from '@nestjs/swagger'

import { SampleRequestDto } from './request-dto'

export class SampleUpdateResultRequestDto extends PickType(SampleRequestDto, [
  'results',
]) {}

export class SampleUpdateResultResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  SampleUpdateResultRequestDto,
) {}
