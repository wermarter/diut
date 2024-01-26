import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { UserCreateRequestDto } from './create.request-dto'
import { exampleUser } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { RoleUnpopulatedResponseDto } from '../../role/dto/response-dto'

export class UserResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  OmitType(UserCreateRequestDto, ['password']),
) {
  @Expose()
  @ApiProperty({
    ...exampleUser.branches,
    type: () => BranchUnpopulatedResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branches?: BranchUnpopulatedResponseDto[]

  @Expose()
  @ApiProperty({ ...exampleUser.roles, type: () => RoleUnpopulatedResponseDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleUnpopulatedResponseDto)
  roles?: RoleUnpopulatedResponseDto[]
}
