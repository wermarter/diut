import { PaginatedResponse } from '@diut/nestjs-infra'

import { RoleResponseDto } from './response-dto'

export class RoleSearchResponseDto extends PaginatedResponse(RoleResponseDto) {}
