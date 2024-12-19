import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { exampleRole } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { RoleRequestDto } from './request-dto'

export class RoleUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  RoleRequestDto,
) {}

export class RoleResponseDto extends RoleUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleRole.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
