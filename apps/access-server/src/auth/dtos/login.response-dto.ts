import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { UserResponseDto } from 'src/resources/users/dtos/user.response-dto'

export class LoginResponseDto extends UserResponseDto {
  @Expose()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken: string
}
