import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { examplePatient } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { PatientRequestDto } from './request-dto'

export class PatientUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PatientRequestDto,
) {}

export class PatientResponseDto extends PatientUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...examplePatient.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
