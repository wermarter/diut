import { SearchRequestDto } from '@diut/nest-core'

import { User } from 'src/domain'

export class UserSearchRequestDto extends SearchRequestDto<User> {}
