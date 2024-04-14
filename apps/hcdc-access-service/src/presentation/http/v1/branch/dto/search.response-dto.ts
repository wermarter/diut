import { PaginatedResponse } from '@diut/nestjs-infra'

import { BranchResponseDto } from './response-dto'

export class BranchSearchResponseDto extends PaginatedResponse(
  BranchResponseDto,
) {}
