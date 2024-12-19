import { PickType } from '@nestjs/swagger'
import { ReportRequestDto } from './request-dto'

export class ExportTraKQRequestDto extends PickType(ReportRequestDto, [
  'fromDate',
  'toDate',
  'branchId',
  'originIds',
  'patientTypeIds',
  'testIds',
  'testComboIds',
]) {}
