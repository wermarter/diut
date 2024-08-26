import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleSampleType } from '../../../shared'

export class SampleTypeRequestDto {
  @Expose()
  @ApiProperty(exampleSampleType.displayIndex)
  @Min(0)
  @IsNumber()
  displayIndex: number

  @Expose()
  @ApiProperty(exampleSampleType.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleSampleType.branchId)
  @IsObjectId()
  branchId: string
}
