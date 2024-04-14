import { PaginatedResponse } from '@diut/nestjs-infra'

import { UserResponseDto } from './response-dto'

export class UserSearchResponseDto extends PaginatedResponse(UserResponseDto) {}
