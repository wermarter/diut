import { PaginatedResponse } from '@diut/nest-core'
import { PrintFormResponseDto } from './print-form.response-dto'

export class SearchPrintFormResponseDto extends PaginatedResponse(
  PrintFormResponseDto,
) {}
