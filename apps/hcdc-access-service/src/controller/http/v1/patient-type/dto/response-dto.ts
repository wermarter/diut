import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { PatientTypeCreateRequestDto } from './create.request-dto'
import { examplePatientType } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class PatientTypeUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PatientTypeCreateRequestDto,
) {}

export class PatientTypeResponseDto extends PatientTypeUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...examplePatientType.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
