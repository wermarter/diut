import { PaginatedResponse } from '@diut/nest-core'

import { UserResponseDto } from './response-dto'

export class UserSearchResponseDto extends PaginatedResponse(UserResponseDto) {}
