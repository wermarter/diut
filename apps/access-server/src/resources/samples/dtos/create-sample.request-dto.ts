import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator'

import { DoctorResponseDto } from 'src/resources/doctors/dtos/doctor.response-dto'
import { IndicationResponseDto } from 'src/resources/indications/dtos/indication.response-dto'
import { PatientTypeResponseDto } from 'src/resources/patient-types/dtos/patient-type.response-dto'
import { PatientResponseDto } from 'src/resources/patients/dtos/patient.response-dto'
import { SampleTypeResponseDto } from 'src/resources/sample-types/dtos/sample-type.response-dto'

export class CreateSampleRequestDto {
  @ApiProperty({
    example: '2232010819',
  })
  @IsString()
  @IsNotEmpty()
  sampleId: string

  @ApiProperty({
    example: '2022-10-24T10:15:00Z',
  })
  @IsDateString()
  sampledAt: Date

  @ApiProperty({
    type: () => PatientResponseDto,
  })
  @Type(() => PatientResponseDto)
  patient: PatientResponseDto

  @ApiProperty({
    type: () => DoctorResponseDto,
  })
  @Type(() => DoctorResponseDto)
  doctor: DoctorResponseDto

  @ApiProperty({
    type: () => PatientTypeResponseDto,
  })
  @Type(() => PatientTypeResponseDto)
  patientType: PatientTypeResponseDto

  @ApiProperty({
    type: () => IndicationResponseDto,
  })
  @Type(() => IndicationResponseDto)
  indication: IndicationResponseDto

  @ApiProperty({
    type: () => SampleTypeResponseDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleTypeResponseDto)
  sampleTypes: SampleTypeResponseDto[]
}
