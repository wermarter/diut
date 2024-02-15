import { SearchRequestDto } from '@diut/nestjs-infra'
import { User } from '@diut/hcdc'

export class UserSearchRequestDto extends SearchRequestDto<User> {}
