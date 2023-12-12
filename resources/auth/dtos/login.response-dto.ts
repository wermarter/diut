import { LoginExceptionMsg } from '@diut/levansy-common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BadRequestDto } from '@diut/nest-core'
import { UserResponseDto } from 'src/resources/users/dtos/user.response-dto'

export class LoginResponseDto extends UserResponseDto {
  @Expose()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  generatedAccessToken: string
}

export class LoginBadRequestDto extends BadRequestDto {
  @ApiProperty({
    enum: LoginExceptionMsg,
  })
  message: LoginExceptionMsg
}
