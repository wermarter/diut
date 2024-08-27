import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { exampleDoctor } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { DoctorRequestDto } from './request-dto'

export class DoctorUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  DoctorRequestDto,
) {}

export class DoctorResponseDto extends DoctorUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleDoctor.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
