import { PaginatedResponse } from '@diut/nestjs-core'

import { UserResponseDto } from './response-dto'

export class UserSearchResponseDto extends PaginatedResponse(UserResponseDto) {}
