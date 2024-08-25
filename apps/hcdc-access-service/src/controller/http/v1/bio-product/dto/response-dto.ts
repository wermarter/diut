import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { BioProductCreateRequestDto } from './create.request-dto'
import { exampleBioProduct } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'

export class BioProductUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  BioProductCreateRequestDto,
) {}

export class BioProductResponseDto extends BioProductUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleBioProduct.test,
    type: () => TestUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestUnpopulatedResponseDto)
  @IsOptional()
  test?: TestUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleBioProduct.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
