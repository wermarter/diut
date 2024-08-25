import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { PatientCreateRequestDto } from './create.request-dto'
import { examplePatient } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class PatientUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PatientCreateRequestDto,
) {}

export class PatientResponseDto extends PatientUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...examplePatient.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
