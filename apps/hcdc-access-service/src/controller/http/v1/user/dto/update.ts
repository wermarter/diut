import { PartialType } from '@nestjs/swagger'
import { UserRequestDto } from './request-dto'

export class UserUpdateRequestDto extends PartialType(UserRequestDto) {}
