import { PickType } from '@nestjs/swagger'

import { UserCreateRequestDto } from './create.request-dto'

export class UserChangePasswordRequestDto extends PickType(
  UserCreateRequestDto,
  ['password'],
) {}
