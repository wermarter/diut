import { SearchRequestDto } from '@diut/nest-core'
import { User } from '../user.schema'

export class SearchUserRequestDto extends SearchRequestDto<User> {}
