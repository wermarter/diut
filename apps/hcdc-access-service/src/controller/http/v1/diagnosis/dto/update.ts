import { PartialType } from '@nestjs/swagger'
import { DiagnosisRequestDto } from './request-dto'

export class DiagnosisUpdateRequestDto extends PartialType(
  DiagnosisRequestDto,
) {}
