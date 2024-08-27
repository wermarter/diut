import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { Branch } from '@diut/hcdc'

import { BranchResponseDto } from './response-dto'

export class BranchSearchRequestDto extends SearchRequestDto<Branch> {}

export class BranchSearchResponseDto extends PaginatedResponse(
  BranchResponseDto,
) {}
