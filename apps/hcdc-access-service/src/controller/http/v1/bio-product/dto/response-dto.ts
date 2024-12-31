import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { exampleBioProduct } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'
import { BioProductRequestDto } from './request-dto'

export class BioProductUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  BioProductRequestDto,
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
  test?: TestUnpopulatedResponseDto

  @Expose()
  @ApiProperty({
    ...exampleBioProduct.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto
}
