import { PatientGender } from '@diut/hcdc'
import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { examplePatient } from '../../../shared'

export class PatientRequestDto {
  @Expose()
  @ApiProperty(examplePatient.externalId)
  @IsString()
  externalId: string

  @Expose()
  @ApiProperty(examplePatient.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(examplePatient.gender)
  @IsEnum(PatientGender)
  gender: PatientGender

  @Expose()
  @ApiProperty(examplePatient.birthYear)
  @IsNumber()
  @Min(1900)
  birthYear: number

  @Expose()
  @ApiProperty(examplePatient.address)
  @IsString()
  address: string

  @Expose()
  @ApiProperty(examplePatient.phoneNumber)
  @IsString()
  phoneNumber: string

  @Expose()
  @ApiProperty(examplePatient.SSN)
  @IsString()
  SSN: string

  @Expose()
  @ApiProperty(examplePatient.branchId)
  @IsObjectId()
  branchId: string
}
