import { PaginatedResponse } from '@diut/nestjs-core'

import { RoleResponseDto } from './response-dto'

export class RoleSearchResponseDto extends PaginatedResponse(RoleResponseDto) {}
