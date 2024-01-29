import { PaginatedResponse } from '@diut/nestjs-core'

import { BranchResponseDto } from './response-dto'

export class BranchSearchResponseDto extends PaginatedResponse(
  BranchResponseDto,
) {}
