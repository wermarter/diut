import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { exampleDoctor } from '../../../shared'

export class DoctorRequestDto {
  @Expose()
  @ApiProperty(exampleDoctor.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleDoctor.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleDoctor.branchId)
  @IsObjectId()
  branchId: string
}
