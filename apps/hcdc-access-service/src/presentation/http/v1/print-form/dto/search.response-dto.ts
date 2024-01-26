import { PaginatedResponse } from '@diut/nest-core'

import { PrintFormResponseDto } from './response-dto'

export class PrintFormSearchResponseDto extends PaginatedResponse(
  PrintFormResponseDto,
) {}
