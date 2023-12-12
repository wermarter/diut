import { PaginatedResponse } from '@diut/nest-core'
import { UserResponseDto } from './user.response-dto'

export class SearchUserResponseDto extends PaginatedResponse(UserResponseDto) {}
