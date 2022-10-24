import { PartialType } from '@nestjs/swagger'

import { CreateSampleRequestDto } from './create-sample.request-dto'

export class UpdateSampleRequestDto extends PartialType(
  CreateSampleRequestDto
) {}
