import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { User } from '@diut/hcdc'

import { UserResponseDto } from './response-dto'

export class UserSearchRequestDto extends SearchRequestDto<User> {}

export class UserSearchResponseDto extends PaginatedResponse(UserResponseDto) {}
