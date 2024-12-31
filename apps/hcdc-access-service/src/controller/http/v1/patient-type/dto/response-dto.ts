import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { examplePatientType } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { PatientTypeRequestDto } from './request-dto'

export class PatientTypeUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PatientTypeRequestDto,
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
  branch?: BranchUnpopulatedResponseDto
}
