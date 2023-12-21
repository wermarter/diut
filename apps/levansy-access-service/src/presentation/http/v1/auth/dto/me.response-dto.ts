import { Type } from 'class-transformer'
import { User } from 'src/domain'

export class AuthMeResponseDto {
  // @Type(() => )
  user: User
}
