import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { examplePatientType } from '../../../shared'

export class PatientTypeRequestDto {
  @Expose()
  @ApiProperty(examplePatientType.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(examplePatientType.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(examplePatientType.branchId)
  @IsObjectId()
  branchId: string
}
