import { PartialType } from '@nestjs/swagger'

import { PatientCreateRequestDto } from './create.request-dto'

export class PatientUpdateRequestDto extends PartialType(
  PatientCreateRequestDto,
) {}
