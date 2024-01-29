import { IsObjectId } from '@diut/nestjs-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { examplePatientType } from 'src/domain'

export class PatientTypeCreateRequestDto {
  @Expose()
  @ApiProperty(examplePatientType.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

  @Expose()
  @ApiProperty(examplePatientType.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(examplePatientType.branchId)
  @IsObjectId()
  branchId: string
}
