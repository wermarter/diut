import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { UserResponseDto } from '../../user/dto/response-dto'
import { PermissionRuleRequestDto } from './permission-rule.dto'

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
    type: () => PermissionRuleRequestDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionRuleRequestDto)
  permissions: PermissionRuleRequestDto[]
}
