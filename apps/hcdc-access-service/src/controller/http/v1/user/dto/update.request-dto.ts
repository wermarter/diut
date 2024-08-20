import { PartialType } from '@nestjs/swagger'

import { UserCreateRequestDto } from './create.request-dto'

export class UserUpdateRequestDto extends PartialType(UserCreateRequestDto) {}
