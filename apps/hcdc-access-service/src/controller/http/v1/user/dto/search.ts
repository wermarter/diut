import { User } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { UserResponseDto } from './response-dto'

export class UserSearchRequestDto extends SearchRequestDto<User> {}

export class UserSearchResponseDto extends PaginatedResponse(UserResponseDto) {}
