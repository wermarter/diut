import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'

import { exampleBranch } from '../../../shared'
import { BranchRequestDto } from './request-dto'

export class BranchUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  BranchRequestDto,
) {}

export class BranchResponseDto extends BranchUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleBranch.sampleOrigins,
    type: () => BranchUnpopulatedResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  sampleOrigins?: BranchUnpopulatedResponseDto[]
}
