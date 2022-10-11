import { PaginatedResponse } from 'src/core'
import { UserResponseDto } from './user.response-dto'

export class SearchUserResponseDto extends PaginatedResponse(UserResponseDto) {}
