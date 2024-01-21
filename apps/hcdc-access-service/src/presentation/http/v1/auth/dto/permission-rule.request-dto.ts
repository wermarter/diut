import { MongoQuery } from '@casl/ability'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsObject, IsOptional } from 'class-validator'

import {
  AuthActionUnionType,
  AuthActionValues,
  AuthSubjectUnionType,
  AuthSubjectValues,
  examplePermissionRule,
} from 'src/domain'

export class PermissionRuleRequestDto {
  @ApiProperty(examplePermissionRule.subject)
  @IsEnum(AuthSubjectValues)
  subject: AuthSubjectUnionType

  @ApiProperty(examplePermissionRule.action)
  @IsEnum(AuthActionValues)
  action: AuthActionUnionType

  @ApiProperty(examplePermissionRule.inverted)
  @IsOptional()
  @IsBoolean()
  inverted: boolean

  @ApiProperty(examplePermissionRule.conditions)
  @IsObject()
  conditions: MongoQuery
}
