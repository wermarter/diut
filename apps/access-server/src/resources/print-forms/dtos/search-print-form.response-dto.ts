import { PaginatedResponse } from '@diut/server-core'
import { PrintFormResponseDto } from './print-form.response-dto'

export class SearchPrintFormResponseDto extends PaginatedResponse(
  PrintFormResponseDto,
) {}
