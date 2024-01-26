import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { RoleCreateRequestDto } from './create.request-dto'
import { Branch, exampleRole } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class RoleUnpopulatedResponse extends IntersectionType(
  BaseResourceResponseDto,
  RoleCreateRequestDto,
) {}

export class RoleResponseDto extends RoleUnpopulatedResponse {
  @Expose()
  @ApiProperty({ ...exampleRole.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
