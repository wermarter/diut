import { PaginatedResponse } from '@diut/nestjs-infra'

import { PrintFormResponseDto } from './response-dto'

export class PrintFormSearchResponseDto extends PaginatedResponse(
  PrintFormResponseDto,
) {}
