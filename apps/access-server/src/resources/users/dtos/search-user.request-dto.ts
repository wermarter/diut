import { SearchRequestDto } from '@diut/server-core'
import { User } from '../user.schema'

export class SearchUserRequestDto extends SearchRequestDto<User> {}
