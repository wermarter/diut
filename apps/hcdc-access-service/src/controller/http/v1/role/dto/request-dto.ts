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
import { IsObjectId } from '@diut/nestjs-infra'

import { exampleRole } from '../../../shared'
import { PermissionRuleDto } from '../../auth/dto/permission-rule.dto'

export class RoleRequestDto {
  @Expose()
  @ApiProperty(exampleRole.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleRole.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleRole.description)
  @IsString()
  description: string

  @Expose()
  @ApiProperty({
    ...exampleRole.permissions,
    type: () => PermissionRuleDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionRuleDto)
  permissions: PermissionRuleDto[]

  @Expose()
  @ApiProperty(exampleRole.branchId)
  @IsObjectId()
  branchId: string
}
