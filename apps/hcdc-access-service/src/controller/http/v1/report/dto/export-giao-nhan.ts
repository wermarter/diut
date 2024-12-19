import { PickType } from '@nestjs/swagger'
import { ReportRequestDto } from './request-dto'

export class ExportGiaoNhanRequestDto extends PickType(ReportRequestDto, [
  'fromDate',
  'toDate',
  'branchId',
  'originIds',
  'testIds',
  'testComboIds',
  'patientTypeIds',
]) {}
