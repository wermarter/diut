import { PartialType } from '@nestjs/swagger'

import { PatientTypeCreateRequestDto } from './create.request-dto'

export class PatientTypeUpdateRequestDto extends PartialType(
  PatientTypeCreateRequestDto,
) {}
