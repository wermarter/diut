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
import { IsObjectId } from '@diut/nestjs-core'

import { exampleRole } from 'src/domain'
import { PermissionRuleRequestDto } from '../../auth/dto/permission-rule.dto'

export class RoleCreateRequestDto {
  @Expose()
  @ApiProperty(exampleRole.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

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
  @ApiProperty({
    ...exampleRole.permissions,
    type: () => PermissionRuleRequestDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionRuleRequestDto)
  permissions: PermissionRuleRequestDto[]

  @Expose()
  @ApiProperty(exampleRole.branchId)
  @IsObjectId()
  branchId: string
}
