import { Branch } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { BranchResponseDto } from './response-dto'

export class BranchSearchRequestDto extends SearchRequestDto<Branch> {}

export class BranchSearchResponseDto extends PaginatedResponse(
  BranchResponseDto,
) {}
