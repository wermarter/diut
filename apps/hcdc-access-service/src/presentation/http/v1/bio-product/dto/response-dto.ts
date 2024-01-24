import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { BioProductCreateRequestDto } from './create.request-dto'
import { Branch, exampleBioProduct } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class BioProductResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  BioProductCreateRequestDto,
) {
  @Expose()
  @ApiProperty({ ...exampleBioProduct.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
