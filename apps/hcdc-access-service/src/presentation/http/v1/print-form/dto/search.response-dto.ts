import { PaginatedResponse } from '@diut/nestjs-core'

import { PrintFormResponseDto } from './response-dto'

export class PrintFormSearchResponseDto extends PaginatedResponse(
  PrintFormResponseDto,
) {}
