import { PartialType } from '@nestjs/swagger'

import { DiagnosisCreateRequestDto } from './create.request-dto'

export class DiagnosisUpdateRequestDto extends PartialType(
  DiagnosisCreateRequestDto,
) {}
