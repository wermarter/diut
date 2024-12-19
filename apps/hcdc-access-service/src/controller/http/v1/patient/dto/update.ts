import { PartialType } from '@nestjs/swagger'
import { PatientRequestDto } from './request-dto'

export class PatientUpdateRequestDto extends PartialType(PatientRequestDto) {}
