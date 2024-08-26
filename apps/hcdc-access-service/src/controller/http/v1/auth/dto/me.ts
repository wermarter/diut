import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { UserResponseDto } from '../../user/dto/response-dto'

export class MeResponseDto {
  @Expose()
  @ApiProperty({ type: () => UserResponseDto })
  @ValidateNested()
  @Type(() => UserResponseDto)
  user: UserResponseDto
}
