import { SearchRequestDto } from '@diut/nestjs-core'

import { User } from 'src/domain'

export class UserSearchRequestDto extends SearchRequestDto<User> {}
