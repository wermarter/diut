import { PickType } from '@nestjs/swagger'
import { UserCreateRequestDto } from './create'

export class UserChangePasswordRequestDto extends PickType(
  UserCreateRequestDto,
  ['password'],
) {}
