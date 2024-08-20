import { PartialType } from '@nestjs/swagger'

import { DoctorCreateRequestDto } from './create.request-dto'

export class DoctorUpdateRequestDto extends PartialType(
  DoctorCreateRequestDto,
) {}
