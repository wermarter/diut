import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginRequestDto {
  @ApiProperty({
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
