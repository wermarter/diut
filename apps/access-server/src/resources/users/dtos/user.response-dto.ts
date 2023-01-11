import { Permission, UserExceptionMsg } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { BaseResourceResponseDto } from 'src/clients/mongo'
import { BadRequestDto } from 'src/core'

export class UserResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'levana',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @Expose()
  @ApiProperty({
    example: 'Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty({
    example: '0330556666',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string

  @Expose()
  @ApiProperty({
    example: [Permission[0]],
    enum: Permission,
    enumName: 'Permission',
    isArray: true,
  })
  @IsEnum(Permission, { each: true })
  permissions: Permission[]
}

export class UserBadRequestDto extends BadRequestDto {
  @ApiProperty({
    enum: UserExceptionMsg,
    enumName: 'UserExceptionMsg',
  })
  message: UserExceptionMsg
}
