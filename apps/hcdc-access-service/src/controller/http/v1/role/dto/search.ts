import { Role } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { RoleResponseDto } from './response-dto'

export class RoleSearchRequestDto extends SearchRequestDto<Role> {}

export class RoleSearchResponseDto extends PaginatedResponse(RoleResponseDto) {}
