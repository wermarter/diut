import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { MongoAbility } from '@casl/ability'

import { UserResponseDto } from '../../user/dto/response-dto'

export class AuthMeResponseDto {
  @Expose()
  @ApiProperty({ type: () => UserResponseDto })
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  user: UserResponseDto

  @Expose()
  @ApiProperty()
  ability: MongoAbility
}
