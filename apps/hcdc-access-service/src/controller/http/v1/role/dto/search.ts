import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { Role } from '@diut/hcdc'

import { RoleResponseDto } from './response-dto'

export class RoleSearchRequestDto extends SearchRequestDto<Role> {}

export class RoleSearchResponseDto extends PaginatedResponse(RoleResponseDto) {}
