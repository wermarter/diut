import { OmitType } from '@nestjs/swagger'

import { ReportQuerySoNhanMauRequestDto } from './query-so-nhan-mau'

export class ExportSoNhanMauRequestDto extends OmitType(
  ReportQuerySoNhanMauRequestDto,
  ['offset', 'limit'],
) {}
