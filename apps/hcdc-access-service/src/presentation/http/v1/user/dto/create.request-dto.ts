import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { IsObjectId } from '@diut/nestjs-infra'

import { exampleUser } from 'src/domain'
import { PermissionRuleRequestDto } from '../../auth/dto/permission-rule.dto'

export class UserCreateRequestDto {
  @Expose()
  @ApiProperty(exampleUser.username)
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string

  @Expose()
  @ApiProperty(exampleUser.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleUser.phoneNumber)
  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @Expose()
  @ApiProperty({
    ...exampleUser.inlinePermissions,
    type: () => PermissionRuleRequestDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionRuleRequestDto)
  inlinePermissions: PermissionRuleRequestDto[]

  @Expose()
  @ApiProperty(exampleUser.branchIds)
  @IsArray()
  @IsObjectId({ each: true })
  branchIds: string[]

  @Expose()
  @ApiProperty(exampleUser.roleIds)
  @IsArray()
  @IsObjectId({ each: true })
  roleIds: string[]
}
