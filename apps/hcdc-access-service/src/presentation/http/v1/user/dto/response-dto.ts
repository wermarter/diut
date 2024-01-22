import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { UserCreateRequestDto } from './create.request-dto'
import { Branch, Role, exampleUser } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'
import { RoleResponseDto } from '../../role/dto/response-dto'

export class UserResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  OmitType(UserCreateRequestDto, ['password']),
) {
  @Expose()
  @ApiProperty({ ...exampleUser.branches, type: () => BranchResponseDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branches?: (Branch | null)[]

  @Expose()
  @ApiProperty({ ...exampleUser.roles, type: () => RoleResponseDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleResponseDto)
  roles?: (Role | null)[]
}
