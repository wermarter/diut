import { LoginExceptionMsg } from '@diut/levansy-common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BadRequestDto } from '@diut/nest-core'

export class LoginResponseDto {
  @Expose()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  jwtAccessToken: string
}

export class LoginBadRequestDto extends BadRequestDto {
  @ApiProperty({
    enum: LoginExceptionMsg,
  })
  message: LoginExceptionMsg
}
