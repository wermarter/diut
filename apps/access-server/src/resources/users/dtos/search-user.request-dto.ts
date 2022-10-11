import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { User } from '../user.schema'

export class SearchUserRequestDto extends SearchRequestDto<User> {}
