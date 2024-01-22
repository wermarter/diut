import { MongoQuery } from '@casl/ability'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsBoolean, IsEnum, IsObject, IsOptional } from 'class-validator'

import {
  AuthActionUnionType,
  AuthActionValues,
  AuthSubjectUnionType,
  AuthSubjectValues,
  examplePermissionRule,
} from 'src/domain'

export class PermissionRuleRequestDto {
  @Expose()
  @ApiProperty(examplePermissionRule.subject)
  @IsEnum(AuthSubjectValues)
  subject: AuthSubjectUnionType

  @Expose()
  @ApiProperty(examplePermissionRule.action)
  @IsEnum(AuthActionValues)
  action: AuthActionUnionType

  @Expose()
  @ApiProperty(examplePermissionRule.inverted)
  @IsOptional()
  @IsBoolean()
  inverted: boolean

  @Expose()
  @ApiProperty(examplePermissionRule.conditions)
  @IsObject()
  conditions: MongoQuery
}
