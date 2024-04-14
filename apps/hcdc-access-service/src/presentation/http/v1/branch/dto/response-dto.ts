import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'

import { BranchCreateRequestDto } from './create.request-dto'
import { exampleBranch } from 'src/domain'

export class BranchUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  BranchCreateRequestDto,
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
