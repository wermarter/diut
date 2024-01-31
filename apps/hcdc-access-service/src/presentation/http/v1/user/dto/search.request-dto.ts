import { SearchRequestDto } from '@diut/nestjs-infra'

import { User } from 'src/domain'

export class UserSearchRequestDto extends SearchRequestDto<User> {}
