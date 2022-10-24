import { PartialType } from '@nestjs/swagger'

import { CreatePatientRequestDto } from './create-patient.request-dto'

export class UpdatePatientRequestDto extends PartialType(
  CreatePatientRequestDto
) {}
