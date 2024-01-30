import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'

import { SampleCreateRequestDto, SampleCreateResponseDto } from './create.dto'
import { SampleRequestDto } from './request-dto'
import { SampleResponseDto } from './response-dto'

export class SampleUpdateInfoRequestDto extends PartialType(
  IntersectionType(
    SampleCreateRequestDto,
    PickType(SampleRequestDto, ['isConfirmed']),
  ),
) {}

export class SampleUpdateInfoResponseDto extends IntersectionType(
  SampleCreateResponseDto,
  PickType(SampleResponseDto, ['isConfirmed']),
) {}
