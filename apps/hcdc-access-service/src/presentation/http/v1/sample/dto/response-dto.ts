import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-core'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'

import { exampleSample } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { SampleTypeUnpopulatedResponseDto } from '../../sample-type/dto/response-dto'
import { UserUnpopulatedResponseDto } from '../../user/dto/response-dto'
import { SampleResultTestResponseDto } from './result-test.dto'
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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleResultTestResponseDto)
  results: SampleResultTestResponseDto[] = []

  @Expose()
  @ApiProperty({
    ...exampleSample.infoBy,
    type: () => UserUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => UserUnpopulatedResponseDto)
  @IsOptional()
  infoBy?: UserUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.printedBy,
    type: () => UserUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => UserUnpopulatedResponseDto)
  @IsOptional()
  printedBy?: UserUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.patient,
    type: () => PatientUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => PatientUnpopulatedResponseDto)
  @IsOptional()
  patient?: PatientUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.doctor,
    type: () => DoctorUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => DoctorUnpopulatedResponseDto)
  @IsOptional()
  doctor?: DoctorUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.patientType,
    type: () => PatientTypeUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => PatientTypeUnpopulatedResponseDto)
  @IsOptional()
  patientType?: PatientTypeUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.diagnosis,
    type: () => DiagnosisUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => DiagnosisUnpopulatedResponseDto)
  @IsOptional()
  diagnosis?: DiagnosisUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.origin,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  origin?: BranchUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleSample.sampleTypes,
    type: () => SampleTypeUnpopulatedResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleTypeUnpopulatedResponseDto)
  @IsOptional()
  sampleTypes?: SampleTypeUnpopulatedResponseDto[]

  @Expose()
  @ApiProperty({
    ...exampleSample.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
