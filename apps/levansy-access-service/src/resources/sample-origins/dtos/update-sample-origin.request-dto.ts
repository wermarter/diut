import { PartialType } from '@nestjs/swagger'

import { CreateSampleOriginRequestDto } from './create-sample-origin.request-dto'

export class UpdateSampleOriginRequestDto extends PartialType(
  CreateSampleOriginRequestDto,
) {}
