import { PartialType } from '@nestjs/swagger'

import { DoctorRequestDto } from './request-dto'

export class DoctorUpdateRequestDto extends PartialType(DoctorRequestDto) {}
