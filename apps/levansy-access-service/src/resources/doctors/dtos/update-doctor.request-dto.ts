import { PartialType } from '@nestjs/swagger'

import { CreateDoctorRequestDto } from './create-doctor.request-dto'

export class UpdateDoctorRequestDto extends PartialType(
  CreateDoctorRequestDto,
) {}
