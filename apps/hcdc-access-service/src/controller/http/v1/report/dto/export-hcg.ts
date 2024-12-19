import { PickType } from '@nestjs/swagger'
import { ReportRequestDto } from './request-dto'

export class ExportHCGRequestDto extends PickType(ReportRequestDto, [
  'fromDate',
  'toDate',
  'branchId',
  'originIds',
]) {}
