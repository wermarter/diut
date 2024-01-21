import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import { IsObjectId } from '@diut/nest-core'

import { PermissionRule, exampleRole } from 'src/domain'
import { PermissionRuleRequestDto } from '../../auth/dto/permission-rule.request-dto'

export class RoleCreateRequestDto {
  @Expose()
  @ApiProperty(exampleRole.index)
  @IsNumber()
  @Min(1)
  index: number

  @Expose()
  @ApiProperty(exampleRole.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleRole.description)
  @IsString()
  @IsNotEmpty()
  description: string

  @Expose()
  @ApiProperty({ ...exampleRole.policy, type: () => PermissionRuleRequestDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionRuleRequestDto)
  policy: PermissionRule[]

  @Expose()
  @ApiProperty(exampleRole.branchIds)
  @IsArray()
  @IsObjectId({ each: true })
  branchIds: string[]
}
