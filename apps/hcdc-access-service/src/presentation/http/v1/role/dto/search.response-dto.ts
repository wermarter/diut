import { PaginatedResponse } from '@diut/nest-core'

import { RoleResponseDto } from './response-dto'

export class RoleSearchResponseDto extends PaginatedResponse(RoleResponseDto) {}
