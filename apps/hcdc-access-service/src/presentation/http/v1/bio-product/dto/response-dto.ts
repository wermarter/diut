import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { BioProductCreateRequestDto } from './create.request-dto'
import { exampleBioProduct } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class BioProductUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  BioProductCreateRequestDto,
) {}

export class BioProductResponseDto extends BioProductUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleBioProduct.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branch?: BranchUnpopulatedResponseDto
}
