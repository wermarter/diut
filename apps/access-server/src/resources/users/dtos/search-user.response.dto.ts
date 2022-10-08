import { PaginatedDto } from 'src/core'
import { UserResponseDto } from './user.response.dto'

export class SearchUserResponseDto extends PaginatedDto(UserResponseDto) {}
