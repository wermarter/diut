import { PartialType } from '@nestjs/swagger'

import { CreatePatientTypeRequestDto } from './create-patient-type.request-dto'

export class UpdatePatientTypeRequestDto extends PartialType(
  CreatePatientTypeRequestDto,
) {}
