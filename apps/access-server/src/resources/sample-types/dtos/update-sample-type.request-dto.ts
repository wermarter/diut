import { PartialType } from '@nestjs/swagger'

import { CreateSampleTypeRequestDto } from './create-sample-type.request-dto'

export class UpdateSampleTypeRequestDto extends PartialType(
  CreateSampleTypeRequestDto
) {}
