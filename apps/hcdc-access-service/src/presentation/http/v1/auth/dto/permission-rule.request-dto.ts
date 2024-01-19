import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsOptional } from 'class-validator'

import {
  AuthActionUnionType,
  AuthActions,
  AuthSubject,
  AuthSubjectUnionType,
  AuthSubjects,
  RoleAction,
} from 'src/domain'

export class PermissionRuleRequestDto {
  @ApiProperty({
    example: AuthSubject.Role,
    enum: AuthSubjects,
  })
  @IsEnum(AuthSubject)
  subject: AuthSubjectUnionType

  @ApiProperty({
    example: RoleAction.Manage,
    enum: AuthActions,
  })
  @IsEnum(AuthSubject)
  action: AuthActionUnionType

  @ApiPropertyOptional({
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  inverted: boolean

  type conditions please
}
