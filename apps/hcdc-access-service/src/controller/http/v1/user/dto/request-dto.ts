import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

import { exampleUser } from '../../../shared'
import { PermissionRuleDto } from '../../auth/dto/permission-rule.dto'

export class UserRequestDto {
  @Expose()
  @ApiProperty(exampleUser.username)
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string

  @Expose()
  @ApiProperty(exampleUser.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleUser.phoneNumber)
  @IsNotEmpty()
  @IsString()
  phoneNumber: string

  @Expose()
  @ApiProperty({
    ...exampleUser.inlinePermissions,
    type: () => PermissionRuleDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PermissionRuleDto)
  @IsArray()
  inlinePermissions: PermissionRuleDto[]

  @Expose()
  @ApiProperty(exampleUser.branchIds)
  @IsObjectId({ each: true })
  @IsArray()
  branchIds: string[]

  @Expose()
  @ApiProperty(exampleUser.roleIds)
  @IsObjectId({ each: true })
  @IsArray()
  roleIds: string[]
}
