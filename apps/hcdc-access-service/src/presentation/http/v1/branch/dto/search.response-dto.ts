import { PaginatedResponse } from '@diut/nest-core'

import { BranchResponseDto } from './response-dto'

export class BranchSearchResponseDto extends PaginatedResponse(
  BranchResponseDto,
) {}
