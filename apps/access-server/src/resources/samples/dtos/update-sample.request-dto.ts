import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'

import { CreateSampleRequestDto } from './create-sample.request-dto'
import { SampleResponseDto } from './sample.response-dto'

export class UpdateSampleRequestDto extends PartialType(
  IntersectionType(
    CreateSampleRequestDto,
    PickType(SampleResponseDto, [
      'results',
      'sampleCompleted',
      'infoCompleted',
      'resultBy',
    ])
  )
) {}
