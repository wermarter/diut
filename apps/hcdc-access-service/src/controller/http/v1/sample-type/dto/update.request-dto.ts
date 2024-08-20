import { PartialType } from '@nestjs/swagger'

import { SampleTypeCreateRequestDto } from './create.request-dto'

export class SampleTypeUpdateRequestDto extends PartialType(
  SampleTypeCreateRequestDto,
) {}
