import { IntersectionType, PickType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-core'

import { SampleRequestDto } from './request-dto'

export class SampleUpdateResultRequestDto extends PickType(SampleRequestDto, [
  'results',
]) {}

export class SampleUpdateResultResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  SampleUpdateResultRequestDto,
) {}
