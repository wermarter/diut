import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'

import { exampleSample } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { SampleTypeUnpopulatedResponseDto } from '../../sample-type/dto/response-dto'
import { UserUnpopulatedResponseDto } from '../../user/dto/response-dto'
import {
  OmittedTestResponseDto,
  SampleResultTestResponseDto,
} from './result-test.dto'
import { PatientUnpopulatedResponseDto } from '../../patient/dto/response-dto'
import { DoctorUnpopulatedResponseDto } from '../../doctor/dto/response-dto'
import { PatientTypeUnpopulatedResponseDto } from '../../patient-type/dto/response-dto'
import { DiagnosisUnpopulatedResponseDto } from '../../diagnosis/dto/response-dto'
import { SampleRequestDto } from './request-dto'

export class SampleUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  SampleRequestDto,
) {}

export class SampleResponseDto extends SampleUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleSample.results,
    type: () => SampleResultTestResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => SampleResultTestResponseDto)
  @IsArray()
  results: SampleResultTestResponseDto[] = []

  @Expose()
  @ApiProperty({
    ...exampleSample.infoBy,
    type: () => UserUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => UserUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  infoBy?: UserUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.printedBy,
    type: () => UserUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => UserUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  printedBy?: UserUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.patient,
    type: () => PatientUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => PatientUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  patient?: PatientUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.doctor,
    type: () => DoctorUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => DoctorUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  doctor?: DoctorUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.patientType,
    type: () => PatientTypeUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => PatientTypeUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  patientType?: PatientTypeUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.diagnosis,
    type: () => DiagnosisUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => DiagnosisUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  diagnosis?: DiagnosisUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.origin,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  origin?: BranchUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.sampleTypes,
    type: () => SampleTypeUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => SampleTypeUnpopulatedResponseDto)
  @IsArray()
  @IsOptional()
  sampleTypes?: SampleTypeUnpopulatedResponseDto[]

  @Expose()
  @ApiProperty({
    ...exampleSample.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}

export class OmittedSampleResponseDto extends OmitType(SampleResponseDto, [
  'results',
]) {
  @Expose()
  @ApiProperty({
    ...exampleSample.results,
    type: () => OmittedTestResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => OmittedTestResponseDto)
  @IsArray()
  results: OmittedTestResponseDto[]
}
