import { PickType } from '@nestjs/swagger'

import { ReportRequestDto } from './request-dto'

export class ExportSoiNhuomRequestDto extends PickType(ReportRequestDto, [
  'fromDate',
  'toDate',
  'branchId',
  'originIds',
]) {}
