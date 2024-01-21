import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose } from 'class-transformer'

import { RoleCreateRequestDto } from './create.request-dto'
import { Branch, exampleRole } from 'src/domain'

export class RoleResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  RoleCreateRequestDto,
) {
  @Expose()
  @ApiProperty(exampleRole.branches)
  branches?: Branch[]
}
