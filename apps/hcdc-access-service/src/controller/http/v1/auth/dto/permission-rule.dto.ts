import {
  AuthActionUnionType,
  AuthActionValues,
  AuthSubjectUnionType,
  AuthSubjectValues,
  MongoQuery,
  SubjectEntityMapping,
} from '@diut/hcdc'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'
import { examplePermissionRule } from '../../../shared'

export class PermissionRuleDto {
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
  @IsBoolean()
  @IsOptional()
  inverted?: boolean

  @Expose()
  @ApiProperty(examplePermissionRule.conditions)
  @IsObject()
  conditions: MongoQuery

  @Expose()
  @ApiProperty(examplePermissionRule.fields)
  @IsString({ each: true })
  @IsOptional()
  fields?: (keyof SubjectEntityMapping[keyof SubjectEntityMapping])[]
}
