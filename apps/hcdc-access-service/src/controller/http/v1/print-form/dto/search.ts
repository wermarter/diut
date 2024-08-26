import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { PrintForm } from '@diut/hcdc'

import { PrintFormResponseDto } from './response-dto'

export class PrintFormSearchRequestDto extends SearchRequestDto<PrintForm> {}

export class PrintFormSearchResponseDto extends PaginatedResponse(
  PrintFormResponseDto,
) {}
