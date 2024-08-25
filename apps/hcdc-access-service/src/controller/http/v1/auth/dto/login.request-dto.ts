import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { exampleUser } from '../../../shared'

export class AuthLoginRequestDto {
  @ApiProperty(exampleUser.username)
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string
}
