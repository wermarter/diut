import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'

import { exampleUser } from '../../../shared'
import { UserResponseDto } from '../../user/dto/response-dto'
import { PermissionRuleDto } from './permission-rule.dto'

export class LoginRequestDto {
  @ApiProperty(exampleUser.username)
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string
}

export class LoginResponseDto {
  @Expose()
  @ApiProperty({
    type: () => UserResponseDto,
  })
  @ValidateNested()
  @Type(() => UserResponseDto)
  user: UserResponseDto

  @Expose()
  @ApiProperty({
    isArray: true,
    type: () => PermissionRuleDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PermissionRuleDto)
  @IsArray()
  permissions: PermissionRuleDto[]
}
