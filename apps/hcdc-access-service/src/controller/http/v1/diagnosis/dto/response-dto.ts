import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { exampleDiagnosis } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { DiagnosisRequestDto } from './request-dto'

export class DiagnosisUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  DiagnosisRequestDto,
) {}

export class DiagnosisResponseDto extends DiagnosisUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleDiagnosis.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
