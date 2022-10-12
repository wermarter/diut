import { Role, AppPermission } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResourceResponseDto } from 'src/clients/mongo'
import { BadRequestDto } from 'src/core'
import { UserExceptionMsg } from '../user.common'

export class UserResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'levana',
  })
  username: string

  @Expose()
  @ApiProperty({
    example: 'Lê Văn A',
  })
  name: string

  @Expose()
  @ApiProperty({
    example: '0330556666',
    required: false,
  })
  phoneNumber?: string

  @Expose()
  @ApiProperty({
    example: [Role.User],
    enum: Role,
    isArray: true,
  })
  roles: Role[]

  @Expose()
  @ApiProperty({
    example: [AppPermission.Overview],
    enum: AppPermission,
    isArray: true,
  })
  permissions: AppPermission[]
}

export class UserBadRequestDto extends BadRequestDto {
  @ApiProperty({
    enum: UserExceptionMsg,
  })
  message: UserExceptionMsg
}
