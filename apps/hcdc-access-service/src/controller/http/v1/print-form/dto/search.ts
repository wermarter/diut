import { PrintForm } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { PrintFormResponseDto } from './response-dto'

export class PrintFormSearchRequestDto extends SearchRequestDto<PrintForm> {}

export class PrintFormSearchResponseDto extends PaginatedResponse(
  PrintFormResponseDto,
) {}
