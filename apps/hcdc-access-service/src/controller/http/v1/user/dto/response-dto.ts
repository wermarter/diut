import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'

import { exampleUser } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { RoleUnpopulatedResponseDto } from '../../role/dto/response-dto'
import { UserCreateRequestDto } from './create'

export class UserUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  OmitType(UserCreateRequestDto, ['password']),
) {}

export class UserResponseDto extends UserUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleUser.branches,
    type: () => BranchUnpopulatedResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branches?: BranchUnpopulatedResponseDto[]

  @Expose()
  @ApiProperty({ ...exampleUser.roles, type: () => RoleUnpopulatedResponseDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleUnpopulatedResponseDto)
  @IsOptional()
  roles?: RoleUnpopulatedResponseDto[]
}
