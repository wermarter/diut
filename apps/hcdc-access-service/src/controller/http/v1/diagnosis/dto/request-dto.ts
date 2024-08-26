import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleDiagnosis } from '../../../shared'

export class DiagnosisRequestDto {
  @Expose()
  @ApiProperty(exampleDiagnosis.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleDiagnosis.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleDiagnosis.branchId)
  @IsObjectId()
  branchId: string
}
