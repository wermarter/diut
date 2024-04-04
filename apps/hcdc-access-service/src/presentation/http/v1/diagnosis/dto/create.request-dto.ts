import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleDiagnosis } from 'src/domain'

export class DiagnosisCreateRequestDto {
  @Expose()
  @ApiProperty(exampleDiagnosis.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleDiagnosis.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleDiagnosis.branchId)
  @IsObjectId()
  branchId: string
}
