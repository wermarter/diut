import { PaginatedResponse } from 'src/core'
import { PrintFormResponseDto } from './print-form.response-dto'

export class SearchPrintFormResponseDto extends PaginatedResponse(
  PrintFormResponseDto
) {}
