import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { PermissionRule, exampleRole } from 'src/domain'

export class RoleCreateRequestDto {
  @ApiProperty(exampleRole.index)
  @IsNumber()
  @Min(1)
  index: number

  @ApiProperty(exampleRole.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty(exampleRole.description)
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty(exampleRole.policy)
  @IsString()
  @IsNotEmpty()
  policy: PermissionRule[]

  @ApiProperty(exampleRole.branchIds)
  @IsString()
  @IsNotEmpty()
  branchIds: string[]
}
