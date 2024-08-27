import { PickType } from '@nestjs/swagger'

import { ReportRequestDto } from './request-dto'

export class ExportCTMRequestDto extends PickType(ReportRequestDto, [
  'fromDate',
  'toDate',
  'branchId',
  'originIds',
]) {}
