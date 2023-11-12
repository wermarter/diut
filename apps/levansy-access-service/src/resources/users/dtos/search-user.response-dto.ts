import { PaginatedResponse } from '@diut/server-core'
import { UserResponseDto } from './user.response-dto'

export class SearchUserResponseDto extends PaginatedResponse(UserResponseDto) {}
