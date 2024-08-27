import { PartialType } from '@nestjs/swagger'

import { PatientTypeRequestDto } from './request-dto'

export class PatientTypeUpdateRequestDto extends PartialType(
  PatientTypeRequestDto,
) {}
