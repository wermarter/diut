import { PartialType } from '@nestjs/swagger'

import { SampleCreateRequestDto } from './create.request-dto'

export class SampleUpdateRequestDto extends PartialType(
  SampleCreateRequestDto,
) {}
