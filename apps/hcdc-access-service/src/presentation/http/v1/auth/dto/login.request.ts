import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { exampleUser } from 'src/domain'

export class AuthLoginRequestDto {
  @ApiProperty(exampleUser.username)
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty(exampleUser.password)
  @IsString()
  @IsNotEmpty()
  password: string
}
