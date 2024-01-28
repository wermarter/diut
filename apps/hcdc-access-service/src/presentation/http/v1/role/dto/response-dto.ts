import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { RoleCreateRequestDto } from './create.request-dto'
import { exampleRole } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class RoleUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  RoleCreateRequestDto,
) {}

export class RoleResponseDto extends RoleUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleRole.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
