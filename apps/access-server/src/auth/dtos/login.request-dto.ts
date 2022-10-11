import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginRequestDto {
  @ApiProperty({
    example: 'haminhchien',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    example: 'p@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
